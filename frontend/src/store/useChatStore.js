import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isAISending: false,
  lastMessageId: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      const messages = res.data;
      set({ 
        messages,
        lastMessageId: messages.length > 0 ? messages[messages.length - 1]._id : null
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message");
    }
  },

  sendAIMessage: async (prompt) => {
    const { selectedUser, messages } = get();
    set({ isAISending: true });
    try {
      const res = await axiosInstance.post(`/messages/ai/send/${selectedUser._id}`, { prompt });
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send AI message");
    } finally {
      set({ isAISending: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    const currentUserId = useAuthStore.getState().authUser._id;

    // Remove any existing listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { messages } = get();
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      const isMessageToSelectedUser = newMessage.receiverId === selectedUser._id;
      const isMessageFromCurrentUser = newMessage.senderId === currentUserId;
      const isMessageToCurrentUser = newMessage.receiverId === currentUserId;

      if ((isMessageFromSelectedUser && isMessageToCurrentUser) || 
          (isMessageFromCurrentUser && isMessageToSelectedUser)) {
        const messageExists = messages.some(msg => msg._id === newMessage._id);
        if (!messageExists) {
          set({ messages: [...messages, newMessage] });
        }
      }
    });

    // Start polling for new messages
    const pollInterval = setInterval(async () => {
      const { selectedUser, lastMessageId } = get();
      if (!selectedUser) {
        clearInterval(pollInterval);
        return;
      }

      try {
        const res = await axiosInstance.get(`/messages/${selectedUser._id}`);
        const newMessages = res.data;
        
        if (newMessages.length > 0) {
          const lastNewMessage = newMessages[newMessages.length - 1];
          if (lastNewMessage._id !== lastMessageId) {
            set({ 
              messages: newMessages,
              lastMessageId: lastNewMessage._id
            });
          }
        }
      } catch (error) {
        console.error("Error polling messages:", error);
      }
    }, 1000); // Poll every second

    // Cleanup function
    return () => {
      clearInterval(pollInterval);
      socket.off("newMessage");
    };
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
