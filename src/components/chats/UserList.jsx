// components/UserList.js
"use client";
import { useEffect, useState } from "react";
import SidebarUser from "./SidebarUser";

export default function UserList({ session, onSelectUser, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/api/users`)
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.filter((u) => u.email !== session.user.email))
      )
      .catch(console.error);
  }, [session]);

  if (!session) return null;

  return (
    <div className="flex flex-col md:pt-0 pt-15 md:w-72 w-full h-full border-r border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {users.map((user) => (
          <SidebarUser
            key={user.email}
            user={user}
            isSelected={selectedUser?.email === user.email}
            onClick={() => onSelectUser(user)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 p-3 border-t border-gray-200 bg-gray-50">
        <img
          src={session.user.image || "/default-avatar.png"}
          alt={session.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800 truncate">{session.user.name}</span>
      </div>
    </div>
  );
}
