import { useState, useEffect } from "react";
import Comment from "./Comment";
import "../css/CommentsFeed.css";

const CommentsFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [webSocket, setWebSocket] = useState(new WebSocket("ws://localhost:3002"));

  const setUpWebSocket = () => {
    // Setting up websocket for live updates to comment feed whenever it is updated.
    setWebSocket(new WebSocket("ws://localhost:3002"));
  }

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
      setIsError(false);
      
    } catch (error) {
      setIsError(true);
      console.error("There was an error!", error);
    }
    setIsLoading(false);
  };

  // Get the comments for the first time. 
  useEffect(() => {
    getComments();
  }, []);

  // Add websocket listeners. 
  useEffect(() => {
    // The server will send a message whenever a new comment has been added, update all comments when this happens. 
    webSocket.addEventListener("message", () => {
      getComments();
    });
    // Sometimes the websocket automatically closes after inactivity, making sure this doesn't happen. 
    webSocket.addEventListener('close', setUpWebSocket)
  }, [webSocket]);

  return (
    <div className="comments-feed">
      {/* Loading message */}
      {isLoading && <h2>Loading comments...</h2>}

      {/* Error message */}
      {isError && <h2>There was an error with getting the comments.</h2>}
      
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
