import { useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";

export default function ChatWindow({ messages, onSend, currentUser, darkMode }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chat-window ${darkMode ? "dark" : "light"}`}>
      <div className="chat-messages">
        <MessageList messages={messages} currentUser={currentUser} darkMode={darkMode} />
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <MessageInput onSend={onSend} />
      </div>
    </div>
  );
}
