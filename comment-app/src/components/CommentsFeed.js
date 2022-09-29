import { useState, useEffect } from "react";
import "../css/CommentsFeed.css";
import Comment from "./Comment";

const CommentsFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Setting up websocket for live updates to comment feed whenever it is updated.
    const ws = new WebSocket("ws://localhost:3002");

    // If a message was sent, that means a comment was added. Refresh the feed.
    ws.addEventListener("message", () => {
      getComments();
    });
  }, []);

  const getComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/getComments");
      if (!response.ok) {
        throw new Error("Comment request failed!");
      }
      const data = await response.json();
      // To make sure the newest comments are shown first.
      setComments(data.reverse());
      
    } catch (error) {
      console.error("There was an error!", error);
      alert("There was an error with getting the comments.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="comments-feed">
      {/* Loading message */}
      {isLoading && <h2>Loading comments...</h2>}

      {/* No comments are being returned */}
      {comments.length === 0 && <h2>No comments found.</h2>}

      {comments.map((comment, index) => (
        <Comment 
          key={index} 
          name={comment.name} 
          comment={comment.message} 
          date={comment.created}
        />
        )
      )}
    </div>
  );
};

export default CommentsFeed;
