import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./ContactMessages.css";

export default function ContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [filterSubject, setFilterSubject] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

  useEffect(() => {
    // Load all messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    setMessages(savedMessages.reverse()); // Show newest first

    // Load all replies
    const savedReplies = JSON.parse(localStorage.getItem("messageReplies") || "{}");
    setReplies(savedReplies);
  }, []);

  useEffect(() => {
    // Update reply text when message changes
    if (selectedMessage && replies[selectedMessage.id]) {
      setReplyText(replies[selectedMessage.id].text);
    } else {
      setReplyText("");
    }
  }, [selectedMessage, replies]);

  const subjectOptions = [
    { value: "all", label: "All Messages" },
    { value: "ask-questions", label: "Ask Questions" },
    { value: "report-issues", label: "Report Issues" },
    { value: "general-feedback", label: "General Feedback/Inquiries" },
    { value: "product-review", label: "Product Reviews" },
  ];

  const filteredMessages = 
    filterSubject === "all" 
      ? messages 
      : messages.filter(msg => msg.subject.toLowerCase().includes(filterSubject.toLowerCase()));

  const handleDeleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const updated = messages.filter(msg => msg.id !== id);
      setMessages(updated);
      localStorage.setItem("contactMessages", JSON.stringify(updated.reverse()));
      setSelectedMessage(null);
      setReplyText("");
    }
  };

  const handleSaveReply = () => {
    if (!replyText.trim()) {
      alert("Please type a reply!");
      return;
    }

    const updatedReplies = {
      ...replies,
      [selectedMessage.id]: {
        text: replyText,
        savedAt: new Date().toISOString(),
      }
    };

    setReplies(updatedReplies);
    localStorage.setItem("messageReplies", JSON.stringify(updatedReplies));
    
    alert("✓ Reply/notes saved!");
  };

  const handleClearReply = (messageId) => {
    if (window.confirm("Clear this reply?")) {
      const updatedReplies = { ...replies };
      delete updatedReplies[messageId];
      setReplies(updatedReplies);
      localStorage.setItem("messageReplies", JSON.stringify(updatedReplies));
      setReplyText("");
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL messages? This cannot be undone.")) {
      setMessages([]);
      localStorage.setItem("contactMessages", JSON.stringify([]));
      setSelectedMessage(null);
      setReplyText("");
    }
  };

  return (
    <div className="contact-messages-page">
      <Breadcrumb />

      <div className="messages-container">
        <div className="messages-header">
          <h1>Customer Messages</h1>
          <p className="message-count">Total: {messages.length} message{messages.length !== 1 ? 's' : ''}</p>
        </div>

        {messages.length === 0 ? (
          <div className="no-messages">
            <p>📭 No messages yet</p>
            <button 
              className="btn-back"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="messages-layout">
            {/* Messages List */}
            <div className="messages-list-section">
              <div className="filter-section">
                <label>Filter by Subject:</label>
                <select 
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="filter-select"
                >
                  {subjectOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="messages-list">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map(message => (
                    <div 
                      key={message.id}
                      className={`message-item ${selectedMessage?.id === message.id ? 'active' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="message-item-header">
                        <p className="message-name">{message.name}</p>
                        <p className="message-subject">{message.subject}</p>
                      </div>
                      <p className="message-preview">{message.message.substring(0, 80)}...</p>
                      <p className="message-date">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                      {replies[message.id] && (
                        <p className="message-replied">✓ Replied</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-results">No messages found</p>
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="message-detail-section">
              {selectedMessage ? (
                <div className="message-detail">
                  <div className="detail-header">
                    <h2>{selectedMessage.subject}</h2>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="detail-info">
                    <div className="info-row">
                      <span>From:</span>
                      <strong>{selectedMessage.name}</strong>
                    </div>
                    <div className="info-row">
                      <span>Email:</span>
                      <strong>{selectedMessage.email}</strong>
                    </div>
                    <div className="info-row">
                      <span>Date:</span>
                      <strong>{new Date(selectedMessage.timestamp).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="detail-message">
                    <h3>Message:</h3>
                    <p>{selectedMessage.message}</p>
                  </div>

                  {/* Reply/Notes Section */}
                  <div className="reply-section">
                    <h3>📝 Your Reply/Notes:</h3>
                    <textarea
                      className="reply-textarea"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply or internal notes here..."
                      rows="6"
                    />
                  </div>

                  <div className="detail-actions">
                    <button 
                      className="btn-save-reply"
                      onClick={handleSaveReply}
                    >
                      💾 Save Reply
                    </button>
                    {replies[selectedMessage.id] && (
                      <>
                        <button 
                          className="btn-clear-reply"
                          onClick={() => handleClearReply(selectedMessage.id)}
                        >
                          Clear Reply
                        </button>
                        <p className="reply-saved">
                          ✓ Saved: {new Date(replies[selectedMessage.id].savedAt).toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="email-section">
                    <button 
                      className="btn-copy-email"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMessage.email);
                        alert(`Email copied: ${selectedMessage.email}`);
                      }}
                    >
                      📋 Copy Email
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <p>Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="messages-footer">
            <button 
              className="btn-clear-all"
              onClick={handleClearAll}
            >
              🗑️ Clear All Messages
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
