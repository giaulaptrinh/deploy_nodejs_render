// import React, { useState, useRef, useEffect } from "react";
// import "../../assets/css//TaskDetails/SidebarRight.css";

// const Comment = ({ comment, onReply }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyText, setReplyText] = useState("");

//   const handleReply = () => {
//     if (replyText.trim()) {
//       onReply(comment.id, replyText);
//       setReplyText("");
//       setShowReplyForm(false);
//     }
//   };

//   const handleCopyComment = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="comment-thread">
//       <div className="comment">
//         <div className="comment-avatar">
//           {comment.author ? comment.author.charAt(0) : "U"}
//         </div>
//         <div className="comment-content">
//           <div className="comment-header">
//             <div className="comment-info">
//               <span className="author">{comment.author}</span>
//               <span className="timestamp">{comment.date}</span>
//             </div>
//             <div className="comment-actions">
//               <button
//                 className="icon-button"
//                 onClick={() => setShowReplyForm(!showReplyForm)}
//               >
//                 <img src="/assets/icons/reply_icon.svg" alt="Reply" />
//               </button>
//               <button
//                 className="icon-button"
//                 onClick={() => handleCopyComment(comment.text)}
//               >
//                 <img src="/assets/icons/copy_comment_icon.svg" alt="Copy" />
//               </button>
//             </div>
//           </div>
//           <p className="comment-text">{comment.text}</p>

//           {comment.attachment && (
//             <div className="comment-attachment">
//               <a
//                 href={comment.attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="attachment-link"
//               >
//                 <img
//                   src={
//                     comment.attachment.type.includes("image")
//                       ? comment.attachment.url
//                       : "/assets/icons/file.svg"
//                   }
//                   alt="Attachment"
//                   className={
//                     comment.attachment.type.includes("image")
//                       ? "attachment-preview"
//                       : "attachment-icon"
//                   }
//                 />
//                 <span className="attachment-name">
//                   {comment.attachment.name}
//                 </span>
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {showReplyForm && (
//         <div className="comment-input-wrapper reply-input-wrapper">
//           <input
//             type="text"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleReply()}
//             placeholder="Viết phản hồi..."
//             className="comment-textbox expanded"
//             autoFocus
//           />
//           <button className="send-btn" onClick={handleReply} title="Send">
//             <img src="/assets/icons/send_icon.svg" alt="Send" />
//           </button>
//         </div>
//       )}

//       {comment.replies && comment.replies.length > 0 && (
//         <div className="replies-container">
//           {comment.replies.map((reply, index) => (
//             <div key={index} className="reply-comment">
//               <div className="comment-avatar">
//                 {reply.author ? reply.author.charAt(0) : "U"}
//               </div>
//               <div className="comment-content">
//                 <div className="comment-header">
//                   <div className="comment-info">
//                     <span className="author">{reply.author}</span>
//                     <span className="timestamp">{reply.date}</span>
//                   </div>
//                 </div>
//                 <p className="comment-text">{reply.text}</p>
//                 <div className="comment-actions">
//                   <button
//                     className="action-button"
//                     onClick={() => setShowReplyForm(true)}
//                   >
//                     <img
//                       src="/assets/icons/reply_icon.svg"
//                       alt="Reply"
//                       className="action-icon"
//                     />
//                   </button>
//                   <button
//                     className="action-button"
//                     onClick={() => handleCopyComment(reply.text)}
//                   >
//                     <img
//                       src="/assets/icons/copy_comment_icon.svg"
//                       alt="Copy"
//                       className="action-icon"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const SidebarRight = ({ showComments, setShowComments, comments = [] }) => {
//   const [newComment, setNewComment] = useState("");
//   const [commentsList, setCommentsList] = useState(comments);
//   const [attachedFile, setAttachedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const toggleComments = () => setShowComments((prev) => !prev);

//   // Hàm điều chỉnh chiều cao của textarea dựa trên nội dung
//   const adjustTextareaHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height =
//         textareaRef.current.scrollHeight + "px";
//     }
//   };

//   // Điều chỉnh chiều cao khi nội dung thay đổi
//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [newComment]);

//   // Điều chỉnh chiều cao khi file được đính kèm
//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [attachedFile]);

//   const handleFileClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setAttachedFile(file);
//       // Tự động điều chỉnh chiều cao sau khi file được chọn
//       setTimeout(adjustTextareaHeight, 0);
//     }
//   };

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() || attachedFile) {
//       const newCommentData = {
//         id: Date.now(),
//         author: "Current User",
//         text: newComment,
//         date: new Date().toLocaleString(),
//         replies: [],
//         attachment: attachedFile
//           ? {
//               name: attachedFile.name,
//               type: attachedFile.type,
//               size: attachedFile.size,
//               url: URL.createObjectURL(attachedFile),
//             }
//           : null,
//       };
//       const updatedComments = [...commentsList, newCommentData];
//       setCommentsList(updatedComments);
//       setNewComment("");
//       setAttachedFile(null);

//       // Reset chiều cao của textarea
//       if (textareaRef.current) {
//         textareaRef.current.style.height = "auto";
//       }
//     }
//   };

//   const handleReply = (commentId, replyText) => {
//     const reply = {
//       id: Date.now(),
//       author: "Current User",
//       text: replyText,
//       date: new Date().toLocaleString(),
//     };

//     const updatedComments = commentsList.map((comment) => {
//       if (comment.id === commentId) {
//         return {
//           ...comment,
//           replies: [...(comment.replies || []), reply],
//         };
//       }
//       return comment;
//     });

//     setCommentsList(updatedComments);
//   };

//   return (
//     <div className="sidebar-right-container">
//       <div className="sidebar-right">
//         <div className="sidebar-content">
//           {showComments && commentsList.length > 0 && (
//             <div className="comments-list">
//               {commentsList.map((comment, index) => (
//                 <Comment
//                   key={comment.id || index}
//                   comment={comment}
//                   onReply={handleReply}
//                 />
//               ))}
//             </div>
//           )}
//           {showComments && commentsList.length === 0 && (
//             <p className="no-comment">No comment</p>
//           )}
//         </div>
//         {showComments && (
//           <div className="add-comment-section fixed-to-bottom">
//             <div className="comment-input-wrapper">
//               <div className="textarea-container">
//                 {attachedFile && (
//                   <div className="attached-file-preview">
//                     <div className="attached-file-info">
//                       <span className="file-icon">📎</span>
//                       <span className="file-name">{attachedFile.name}</span>
//                       <button
//                         className="remove-file-btn"
//                         onClick={() => setAttachedFile(null)}
//                         title="Remove file"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 <textarea
//                   ref={textareaRef}
//                   value={newComment}
//                   onChange={handleCommentChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handleAddComment();
//                     }
//                   }}
//                   placeholder="Write something..."
//                   className="comment-textbox expanded"
//                   rows="1"
//                 />
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//               />
//               <div className="comment-actions-buttons">
//                 <button
//                   className="attach-btn"
//                   onClick={handleFileClick}
//                   title="Attach File"
//                 >
//                   <img src="/assets/icons/attachment_icon.svg" alt="Attach" />
//                 </button>
//                 <button
//                   className="send-btn"
//                   onClick={handleAddComment}
//                   title="Send"
//                 >
//                   <img src="/assets/icons/send_icon.svg" alt="Send" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="sidebar-buttons-fixed">
//         <div className="button-wrapper" onClick={toggleComments}>
//           <button className="comment-btn">
//             <span>
//               <img
//                 src="/assets/icons/Message.svg"
//                 alt="Comments"
//                 className="button-icon"
//               />
//             </span>
//             {showComments ? "Comments" : "Comments"}
//           </button>
//         </div>
//         <div className="button-wrapper">
//           <button className="ai-btn">
//             <span>
//               <img
//                 src="/assets/icons/ai.svg"
//                 alt="Create AI"
//                 className="button-icon"
//               />
//             </span>
//             Create AI
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarRight;
// import React, { useState, useRef, useEffect } from "react";
// import "../../assets/css/TaskDetails/SidebarRight.css";

// // Helper function to generate a unique color based on a string (e.g., username)
// const stringToColor = (string) => {
//   if (!string) return "#CCCCCC"; // Default color if string is empty
//   let hash = 0;
//   for (let i = 0; i < string.length; i++) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const colors = [
//     "#FF6B6B",
//     "#4ECDC4",
//     "#45B7D1",
//     "#96CEB4",
//     "#FFEEAD",
//     "#D4A5A5",
//     "#9B59B6",
//     "#3498DB",
//     "#E74C3C",
//     "#2ECC71",
//   ];
//   const index = Math.abs(hash) % colors.length;
//   return colors[index];
// };

// const Comment = ({ comment, onReply, onCopy }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyText, setReplyText] = useState("");

//   const handleReply = () => {
//     if (replyText.trim()) {
//       onReply(comment.id, replyText);
//       setReplyText("");
//       setShowReplyForm(false);
//     }
//   };

//   // Get the first letter of the author's name for the avatar
//   const avatarLetter = comment.author
//     ? comment.author.charAt(0).toUpperCase()
//     : "U";
//   const avatarColor = stringToColor(comment.author);

//   return (
//     <div className="comment-thread">
//       <div
//         className="comment"
//         style={{ display: "flex", alignItems: "flex-start" }}
//       >
//         <div
//           className="comment-avatar"
//           style={{
//             backgroundColor: avatarColor,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: "50%",
//             width: "32px",
//             height: "32px",
//             color: "#fff",
//             fontSize: "14px",
//             fontWeight: "bold",
//             marginRight: "10px",
//             flexShrink: 0,
//           }}
//         >
//           {avatarLetter}
//         </div>
//         <div className="comment-content" style={{ flex: 1 }}>
//           <div className="comment-header">
//             <div className="comment-info">
//               <span className="author">{comment.author}</span>
//               <span className="timestamp">{comment.date}</span>
//             </div>
//             <div className="comment-actions">
//               <button
//                 className="icon-button-1"
//                 onClick={() => setShowReplyForm(!showReplyForm)}
//               >
//                 <img src="/assets/icons/reply_icon.svg" alt="Reply" />
//               </button>
//               <button
//                 className="icon-button-1"
//                 onClick={() => onCopy(comment.text)}
//               >
//                 <img src="/assets/icons/copy_comment_icon.svg" alt="Copy" />
//               </button>
//             </div>
//           </div>
//           <p className="comment-text">{comment.text}</p>

//           {comment.attachment && (
//             <div className="comment-attachment">
//               <a
//                 href={comment.attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="attachment-link"
//               >
//                 <img
//                   src={
//                     comment.attachment.type.includes("image")
//                       ? comment.attachment.url
//                       : "/assets/icons/file.svg"
//                   }
//                   alt="Attachment"
//                   className={
//                     comment.attachment.type.includes("image")
//                       ? "attachment-preview"
//                       : "attachment-icon"
//                   }
//                 />
//                 <span className="attachment-name">
//                   {comment.attachment.name}
//                 </span>
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {showReplyForm && (
//         <div className="comment-input-wrapper reply-input-wrapper">
//           <input
//             type="text"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleReply()}
//             placeholder="Viết phản hồi..."
//             className="comment-textbox expanded"
//             autoFocus
//           />
//           <button className="send-btn" onClick={handleReply} title="Send">
//             <img src="/assets/icons/send_icon.svg" alt="Send" />
//           </button>
//         </div>
//       )}

//       {comment.replies && comment.replies.length > 0 && (
//         <div className="replies-container">
//           {comment.replies.map((reply, index) => {
//             const replyAvatarLetter = reply.author
//               ? reply.author.charAt(0).toUpperCase()
//               : "U";
//             const replyAvatarColor = stringToColor(reply.author);

//             return (
//               <div
//                 key={index}
//                 className="reply-comment"
//                 style={{ display: "flex", alignItems: "flex-start" }}
//               >
//                 <div
//                   className="comment-avatar"
//                   style={{
//                     backgroundColor: replyAvatarColor,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "50%",
//                     width: "32px",
//                     height: "32px",
//                     color: "#fff",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     marginRight: "10px",
//                     flexShrink: 0,
//                   }}
//                 >
//                   {replyAvatarLetter}
//                 </div>
//                 <div className="comment-content" style={{ flex: 1 }}>
//                   <div className="comment-header">
//                     <div className="comment-info">
//                       <span className="author">{reply.author}</span>
//                       <span className="timestamp">{reply.date}</span>
//                     </div>
//                     <div className="comment-actions">
//                       <button
//                         className="action-button"
//                         onClick={() => setShowReplyForm(true)}
//                       >
//                         <img
//                           src="/assets/icons/reply_icon.svg"
//                           alt="Reply"
//                           className="action-icon"
//                         />
//                       </button>
//                       <button
//                         className="action-button"
//                         onClick={() => onCopy(reply.text)}
//                       >
//                         <img
//                           src="/assets/icons/copy_comment_icon.svg"
//                           alt="Copy"
//                           className="action-icon"
//                         />
//                       </button>
//                     </div>
//                   </div>
//                   <p className="comment-text">{reply.text}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// const SidebarRight = ({ showComments, setShowComments, comments = [] }) => {
//   const [newComment, setNewComment] = useState("");
//   const [commentsList, setCommentsList] = useState(comments);
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [replyingTo, setReplyingTo] = useState(null);
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const toggleComments = () => setShowComments((prev) => !prev);

//   // Adjust textarea height based on content
//   const adjustTextareaHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [newComment, attachedFile]);

//   const handleFileClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setAttachedFile(file);
//       setTimeout(adjustTextareaHeight, 0);
//     }
//   };

//   const handleCopyComment = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const handleAddComment = () => {
//     if (!newComment.trim() && !attachedFile) return;

//     const newCommentData = {
//       id: Date.now(),
//       author: "Current User",
//       text: newComment,
//       date: new Date().toLocaleString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//       replies: [],
//       attachment: attachedFile
//         ? {
//             name: attachedFile.name,
//             type: attachedFile.type,
//             size: attachedFile.size,
//             url: URL.createObjectURL(attachedFile),
//           }
//         : null,
//     };

//     if (replyingTo) {
//       setCommentsList((prev) =>
//         prev.map((comment) =>
//           comment.id === replyingTo.id
//             ? {
//                 ...comment,
//                 replies: [
//                   ...(comment.replies || []),
//                   {
//                     ...newCommentData,
//                     replyToUsername: replyingTo.author,
//                   },
//                 ],
//               }
//             : comment
//         )
//       );
//       setReplyingTo(null);
//     } else {
//       setCommentsList((prev) => [...prev, newCommentData]);
//     }

//     setNewComment("");
//     setAttachedFile(null);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const handleReply = (commentId, replyText) => {
//     const reply = {
//       id: Date.now(),
//       author: "Current User",
//       text: replyText,
//       date: new Date().toLocaleString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//     };

//     setCommentsList((prev) =>
//       prev.map((comment) =>
//         comment.id === commentId
//           ? {
//               ...comment,
//               replies: [...(comment.replies || []), reply],
//             }
//           : comment
//       )
//     );
//   };

//   return (
//     <div className="sidebar-right-container">
//       <div className="sidebar-right">
//         <div className="sidebar-content">
//           {showComments && commentsList.length > 0 && (
//             <div className="comments-list">
//               {commentsList.map((comment, index) => (
//                 <Comment
//                   key={comment.id || index}
//                   comment={comment}
//                   onReply={handleReply}
//                   onCopy={handleCopyComment}
//                 />
//               ))}
//             </div>
//           )}
//           {showComments && commentsList.length === 0 && (
//             <p className="no-comment">No comment</p>
//           )}
//         </div>
//         {showComments && (
//           <div className="add-comment-section fixed-to-bottom">
//             <div className="comment-input-wrapper">
//               {replyingTo && (
//                 <div className="replying-to">
//                   Replying to <span>{replyingTo.author}</span>
//                   <button
//                     type="button"
//                     onClick={() => setReplyingTo(null)}
//                     className="cancel-reply"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}
//               <div className="textarea-container">
//                 {attachedFile && (
//                   <div className="attached-file-preview">
//                     <div className="attached-file-info">
//                       <span className="file-icon">📎</span>
//                       <span className="file-name">{attachedFile.name}</span>
//                       <button
//                         className="remove-file-btn"
//                         onClick={() => setAttachedFile(null)}
//                         title="Remove file"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 <textarea
//                   ref={textareaRef}
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handleAddComment();
//                     }
//                   }}
//                   placeholder={
//                     replyingTo ? "Write a reply..." : "Write something..."
//                   }
//                   className="comment-textbox expanded"
//                   rows="1"
//                 />
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//               />
//               <div className="comment-actions-buttons">
//                 <button
//                   className="attach-btn"
//                   onClick={handleFileClick}
//                   title="Attach File"
//                 >
//                   <img src="/assets/icons/attachment_icon.svg" alt="Attach" />
//                 </button>
//                 <button
//                   className="send-btn"
//                   onClick={handleAddComment}
//                   title="Send"
//                 >
//                   <img src="/assets/icons/send_icon.svg" alt="Send" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="sidebar-buttons-fixed">
//         <div className="button-wrapper" onClick={toggleComments}>
//           <button className="comment-btn">
//             <span>
//               <img
//                 src="/assets/icons/Message.svg"
//                 alt="Comments"
//                 className="button-icon"
//               />
//             </span>
//             {showComments ? "Comments" : "Comments"}
//           </button>
//         </div>
//         <div className="button-wrapper">
//           <button className="ai-btn">
//             <span>
//               <img
//                 src="/assets/icons/ai.svg"
//                 alt="Create AI"
//                 className="button-icon"
//               />
//             </span>
//             Create AI
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarRight;
import React, { useState, useRef, useEffect } from "react";
import CommentSection from "./CommentSection"; // Import CommentSection
import "../../assets/css/TaskDetails/SidebarRight.css";

const SidebarRight = ({ showComments, setShowComments, comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const toggleComments = () => setShowComments((prev) => !prev);

  // Adjust textarea height based on content (if we keep the input form)
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newComment, attachedFile]);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setAttachedFile(file);
      setTimeout(adjustTextareaHeight, 0);
    }
  };

  return (
    <div className="sidebar-right-container">
      <div className="sidebar-right">
        <div className="sidebar-content">
          {showComments && (
            <CommentSection showComments={showComments} comments={comments} />
          )}
          {showComments && comments.length === 0 && (
            <p className="no-comment">No comment</p>
          )}
        </div>
      </div>
      <div className="sidebar-buttons-fixed">
        <div className="button-wrapper" onClick={toggleComments}>
          <button className="comment-btn">
            <span>
              <img
                src="/assets/icons/Message.svg"
                alt="Comments"
                className="button-icon"
              />
            </span>
            {showComments ? "Comments" : "Comments"}
          </button>
        </div>
        <div className="button-wrapper">
          <button className="ai-btn">
            <span>
              <img
                src="/assets/icons/ai.svg"
                alt="Create AI"
                className="button-icon"
              />
            </span>
            Create AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
