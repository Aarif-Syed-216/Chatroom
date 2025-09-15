import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const socket = io("http://localhost:4000");

function randomColor() {
  const colors = ["#4e9af1", "#28a745", "#ff6f61", "#9c27b0", "#ff9800"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("receive_message");
  }, []);

  const handleLogin = () => {
    if (!nameInput.trim()) return;
    const newUser = { name: nameInput.trim(), color: randomColor() };
    setUser(newUser);

    socket.emit("join", newUser.name);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), text, sender: user.name, color: user.color };
    socket.emit("send_message", newMessage);
  };

  if (!user) {
    return (
      <div className={`login-screen ${darkMode ? "dark" : "light"}`}>
        <h2>Enter your username</h2>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Your name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />
        <button onClick={handleLogin}>Join Chat</button>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="app-title">Chatroom</h1>
      <div className="mode-switch">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <ChatWindow
        messages={messages}
        onSend={sendMessage}
        currentUser={user.name}
        darkMode={darkMode}
      />
    </div>
  );
}
