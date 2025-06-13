const announcements = [
  { id: 1, title: "Server Maintenance", content: "Scheduled on June 15, 12:00 AM IST." },
  { id: 2, title: "New Feature", content: "Voice chat now available in groups!" },
  { id: 3, title: "Policy Update", content: "Privacy policy updated on June 1." },
];

const AnnouncementSidebar = () => {
  return (
    <div className="w-64 p-4 rounded-lg bg-base-100 shadow overflow-y-hidden">
      <h2 className="text-lg font-bold mb-4">Announcements</h2>
      <ul className="space-y-3">
        {announcements.map((a) => (
          <li key={a.id} className="p-2 rounded-md bg-base-200 shadow-inner">
            <h3 className="font-semibold text-sm">{a.title}</h3>
            <p className="text-xs text-gray-500">{a.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementSidebar;
