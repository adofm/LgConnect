import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const CalendarModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingText, setMeetingText] = useState("");
  const [meetingTime, setMeetingTime] = useState(""); // New
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:5001/api/meetings", { withCredentials: true })
        .then((res) => setMeetings(res.data))
        .catch((err) => console.error("Error fetching meetings:", err));
    }
  }, [isOpen]);

  const handleAddMeeting = async () => {
    if (!meetingText.trim() || !meetingTime) return;

    try {
      const response = await axios.post(
        "http://localhost:5001/api/meetings",
        {
          title: meetingText,
          date: selectedDate,
          startTime: meetingTime,
        },
        { withCredentials: true }
      );

      setMeetings([...meetings, response.data]);
      setMeetingText("");
      setMeetingTime("");
    } catch (error) {
      console.error("Error adding meeting:", error.response?.data || error.message);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isFutureOrToday = date >= today;

    const hasMeeting = meetings.some(
      (m) => new Date(m.date).toDateString() === date.toDateString()
    );

    if (hasMeeting && isFutureOrToday) {
      return "bg-red-500 text-red font-semibold rounded-full";
    }

    return "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Schedule a Meeting</h2>

        <div className="flex justify-center mb-4">
  <Calendar
    onChange={setSelectedDate}
    value={selectedDate}
    className="rounded shadow"
    tileClassName={tileClassName}
  />
</div>

        <input
          type="text"
          className="mt-4 w-full border border-gray-300 p-2 rounded"
          placeholder="Enter meeting title"
          value={meetingText}
          onChange={(e) => setMeetingText(e.target.value)}
        />

        <input
          type="time"
          className="mt-2 w-full border border-gray-300 p-2 rounded"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />

        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddMeeting}
        >
          Add Meeting
        </button>

        <div className="mt-4">
          <h3 className="font-semibold">
            Meetings on {selectedDate.toDateString()}:
          </h3>
          <ul className="list-disc list-inside">
            {meetings
              .filter(
                (m) =>
                  new Date(m.date).toDateString() ===
                  selectedDate.toDateString()
              )
              .map((m, i) => (
                <li key={i}>
                  {m.title} at {m.startTime}
                </li>
              ))}
          </ul>
        </div>

        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
