import { useState } from "react";
import "./MessageInput.css";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="message-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend(); // Enter to send
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
