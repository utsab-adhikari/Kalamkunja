// components/SidebarUser.js
"use client";

export default function SidebarUser({ user, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors 
                  ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}`}
    >
      <img
        src={user.image || "/default-avatar.png"}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium text-gray-700 truncate">{user.name}</span>
    </div>
  );
}
