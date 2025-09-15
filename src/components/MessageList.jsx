import "./MessageList.css";

export default function MessageList({ messages, currentUser, darkMode }) {
  return (
    <div className="message-list">
      {messages.map((msg) => {
        const isSender = msg.sender === currentUser;
        const isSystem = msg.sender === "System";

        return (
          <div
            key={msg.id}
            className={`message ${isSystem ? "system" : isSender ? "sender" : "receiver"}`}
            style={{
              borderLeft: !isSender && !isSystem ? `4px solid ${msg.color}` : "none",
              borderRight: isSender ? `4px solid ${msg.color}` : "none",
            }}
          >
            {!isSender && !isSystem && (
              <span
                className="sender-name"
                style={{ color: darkMode ? "#00ffcc" : "#007bff" }}
              >
                {msg.sender}:
              </span>
            )}
            {msg.text}
          </div>
        );
      })}
    </div>
  );
}
