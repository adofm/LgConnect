import Meeting from "../models/meeting.model.js";

export const addMeeting = async (req, res) => {
  try {
    const { title, date, startTime } = req.body;

    if (!title || !date || !startTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const meeting = await Meeting.create({
      title,
      date,
      startTime,
      user: req.user._id,
    });

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ user: req.user._id });
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
