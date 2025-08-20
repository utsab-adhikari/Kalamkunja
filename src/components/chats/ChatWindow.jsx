"use client";
import { useEffect, useState, useRef } from "react";
import { initSocket } from "@/utils/socket";

export default function ChatWindow({ session, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize Socket.IO only once per session
  useEffect(() => {
    if (!session) return;

    const s = initSocket();
    setSocket(s);

    s.emit("join", session.user.email.toLowerCase());

    s.on("personalMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => s.disconnect();
  }, [session]);

  // Fetch chat history when selecting a user
  useEffect(() => {
    if (!selectedUser || !session) return;

    fetch(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/api/messages/${session.user.email}/${selectedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        scrollToBottom();
      })
      .catch(console.error);
  }, [selectedUser, session]);

  const sendMessage = () => {
    if (!text || !socket || !selectedUser) return;

    const msg = {
      sender: session.user.email.toLowerCase(),
      receiver: selectedUser.email.toLowerCase(),
      text,
    };

    socket.emit("personalMessage", msg);
    // setMessages((prev) => [...prev, msg]);
    setText("");
    scrollToBottom();
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h2 className="text-gray-500 text-lg">Select a user to start chatting</h2>
      </div>
    );
  }

  const filteredMessages = messages.filter(
    (m) =>
      m.sender === selectedUser.email.toLowerCase() || m.receiver === selectedUser.email.toLowerCase()
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
        {filteredMessages.map((m) => (
          <div
            key={m._id || `${m.sender}-${m.receiver}-${m.text}`}
            className={`mb-2 ${m.sender === session.user.email ? "text-right" : "text-left"}`}
          >
            <span className={`inline-block px-3 py-1 rounded-lg ${m.sender === session.user.email ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              {m.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-4 border-t border-gray-300 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={sendMessage}
          disabled={!socket || !text}
          className="bg-blue-500 text-white px-4 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
