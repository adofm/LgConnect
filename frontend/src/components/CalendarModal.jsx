import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { axiosInstance } from "../lib/axios";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CalendarModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingText, setMeetingText] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMeetings();
    }
  }, [isOpen]);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/meetings");
      setMeetings(res.data);
    } catch (err) {
      console.error("Error fetching meetings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMeeting = async () => {
    if (!meetingText.trim() || !meetingTime) return;

    try {
      const response = await axiosInstance.post("/meetings", {
        title: meetingText,
        date: selectedDate,
        startTime: meetingTime,
        completed: false
      });

      setMeetings([...meetings, response.data]);
      setMeetingText("");
      setMeetingTime("");
    } catch (error) {
      console.error("Error adding meeting:", error.response?.data || error.message);
    }
  };

  const handleToggleMeeting = async (meetingId, currentStatus) => {
    try {
      const response = await axiosInstance.patch(`/meetings/${meetingId}`, {
        completed: !currentStatus
      });

      setMeetings(meetings.map(meeting => 
        meeting._id === meetingId ? response.data : meeting
      ));
    } catch (error) {
      console.error("Error updating meeting:", error);
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
      return "bg-[#A50034] text-black font-semibold rounded-full";
    }

    return "";
  };

  const todayMeetings = meetings.filter(
    (m) => new Date(m.date).toDateString() === new Date().toDateString()
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 relative">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Schedule a Meeting</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="rounded-lg border-0 shadow-sm"
                tileClassName={tileClassName}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Add New Meeting</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/20 outline-none transition-all"
                  placeholder="Enter meeting title"
                  value={meetingText}
                  onChange={(e) => setMeetingText(e.target.value)}
                />
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/20 outline-none transition-all"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                />
                <button
                  className="w-full bg-[#A50034] text-white px-4 py-2 rounded-lg hover:bg-[#720231] transition-colors"
                  onClick={handleAddMeeting}
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Meetings Section */}
          <div className="space-y-4">
            {/* Today's Meetings */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#A50034]" />
                Today's Meetings
              </h3>
              {todayMeetings.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No meetings scheduled for today</p>
              ) : (
                <div className="space-y-2">
                  {todayMeetings.map((meeting) => (
                    <div
                      key={meeting._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleMeeting(meeting._id, meeting.completed)}
                          className={`p-1 rounded-full transition-colors ${
                            meeting.completed
                              ? "text-green-500 hover:text-green-600"
                              : "text-gray-400 hover:text-gray-500"
                          }`}
                        >
                          {meeting.completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <p className={`font-medium ${meeting.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                            {meeting.title}
                          </p>
                          <p className="text-sm text-gray-500">{meeting.startTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Date Meetings */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Meetings on {selectedDate.toDateString()}
              </h3>
              <div className="space-y-2">
                {meetings
                  .filter(
                    (m) =>
                      new Date(m.date).toDateString() === selectedDate.toDateString()
                  )
                  .map((meeting) => (
                    <div
                      key={meeting._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleMeeting(meeting._id, meeting.completed)}
                          className={`p-1 rounded-full transition-colors ${
                            meeting.completed
                              ? "text-green-500 hover:text-green-600"
                              : "text-gray-400 hover:text-gray-500"
                          }`}
                        >
                          {meeting.completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <p className={`font-medium ${meeting.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                            {meeting.title}
                          </p>
                          <p className="text-sm text-gray-500">{meeting.startTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
