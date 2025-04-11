import React, { useState } from "react";
import "../../assets/css/CommentSection.css";

const CommentSection = ({ showComments }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      avatar: "H",
      username: "Nguyen Minh Hieu",
      timestamp: "02/16/25 09:25 AM",
      text: "Comfort & Concentration ☕ 30/5 Pomodoro - Warm Lofi in a Cozy Room for Focus & Relaxation",
      replies: [],
    },
    {
      id: 2,
      avatar: "D",
      username: "U ba kis tan",
      timestamp: "02/19/25 12:25 PM",
      text: "hello mn, cho mình hỏi là lúc điền form mình có điền sai tên của mình ấy ạ, thì có cách nào sửa không ạ",
      replies: [
        {
          id: 21,
          avatar: "S",
          username: "Support Team",
          timestamp: "02/19/25 12:30 PM",
          text: "Đã tạo lun thread cho dễ mò",
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newMessage = {
      id: Date.now(),
      avatar: "U",
      username: "Current User",
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: newComment,
      replies: [],
    };

    if (replyingTo) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === replyingTo
            ? { ...msg, replies: [...msg.replies, newMessage] }
            : msg
        )
      );
    } else {
      setMessages((prev) => [...prev, newMessage]);
    }

    setNewComment("");
    setReplyingTo(null);
  };

  return (
    <div className="comment-section">
      {showComments && (
        <div className="comments-container">
          {messages.map((message) => (
            <div key={message.id} className="comment comment-card">
              <div className="avatar">{message.avatar}</div>
              <div className="content">
                <strong>{message.username}</strong>{" "}
                <span className="timestamp">({message.timestamp})</span>
                <p className="text">{message.text}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CommentSection;
