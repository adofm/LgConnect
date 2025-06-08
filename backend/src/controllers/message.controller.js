import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const availableFunctions = {
  sendMessage: async (content) => {
    return content;
  },
  summarize: async (content) => {
    return `Summary: ${content}`;
  },
  translate: async (content, language) => {
    return `Translation to ${language}: ${content}`;
  },
  format: async (content) => {
    return content.replace(/["']/g, '');
  }
};

const functionDefinitions = [
  {
    name: "sendMessage",
    description: "Send a message to the chat",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The message content to send"
        }
      },
      required: ["content"]
    }
  },
  {
    name: "summarize",
    description: "Summarize the given content",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The content to summarize"
        }
      },
      required: ["content"]
    }
  },
  {
    name: "translate",
    description: "Translate the content to a specified language",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The content to translate"
        },
        language: {
          type: "string",
          description: "The target language"
        }
      },
      required: ["content", "language"]
    }
  },
  {
    name: "format",
    description: "Format the content by removing quotes and unnecessary characters",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The content to format"
        }
      },
      required: ["content"]
    }
  }
];

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendAIMessage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate AI response with function calling
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a helpful AI assistant. When responding, use the available functions to process the user's request. Always try to use the format function to remove unnecessary quotes from the response."
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      functions: functionDefinitions,
      function_call: "auto"
    });

    const response = completion.choices[0].message;
    let aiResponse;

    if (response.function_call) {
      const functionName = response.function_call.name;
      const functionArgs = JSON.parse(response.function_call.arguments);
      
      if (availableFunctions[functionName]) {
        aiResponse = await availableFunctions[functionName](...Object.values(functionArgs));
      } else {
        aiResponse = response.content;
      }
    } else {
      aiResponse = response.content;
    }

    // Always format the response to remove quotes
    aiResponse = await availableFunctions.format(aiResponse);

    // Create message with the actual user as sender
    const newMessage = new Message({
      senderId,  // This is the actual user who initiated the AI message
      receiverId,
      text: aiResponse,
      isAI: true,  // Keep this flag to identify AI-generated messages
    });

    await newMessage.save();

    // Emit to receiver only
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendAIMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAIPreview = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate AI response with function calling
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a helpful AI assistant. When responding, use the available functions to process the user's request. Always try to use the format function to remove unnecessary quotes from the response."
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      functions: functionDefinitions,
      function_call: "auto"
    });

    const response = completion.choices[0].message;
    let aiResponse;

    if (response.function_call) {
      const functionName = response.function_call.name;
      const functionArgs = JSON.parse(response.function_call.arguments);
      
      if (availableFunctions[functionName]) {
        aiResponse = await availableFunctions[functionName](...Object.values(functionArgs));
      } else {
        aiResponse = response.content;
      }
    } else {
      aiResponse = response.content;
    }

    // Always format the response to remove quotes
    aiResponse = await availableFunctions.format(aiResponse);

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.log("Error in getAIPreview controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
