import { useEffect, useState } from "react";
import "../css/CommentForm.css";

const CommentForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [webSocket, setWebSocket] = useState(new WebSocket("ws://localhost:3002"));
  // Websocket to notify the database that a comment has been added.
  const setUpWebSocket = () => {
    // Making sure that the websocket doesn't automatically close.
    setWebSocket(new WebSocket("ws://localhost:3002"));
  }

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const submitCommentHandler = async (e) => {
    // Change the button text to "Submitting..." while making the request.
    setIsLoading(true);
    e.preventDefault();
    // Basic validation to make sure the inputs aren't blank.
    if (nameInput.trim().length === 0 && commentInput.trim().length === 0) {
      alert("Please enter a valid name and comment.");
      setIsLoading(false);
      return;
    } else if (nameInput.trim().length === 0) {
      alert("Please enter a valid name.");
      setIsLoading(false);
      return;
    } else if (commentInput.trim().length === 0) {
      alert("Please enter a valid comment.");
      setIsLoading(false);
      return;
    }

    // Sending the POST request to add the comment to the back-end.
    const commentData = { name: nameInput, message: commentInput };
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    };
    try {
      const response = await fetch("/createComment", requestData);
      if (!response.ok) {
        throw new Error("Comment request failed!");
      }
      // Sending the server a message to make sure all other clients get their comments updated. 
      webSocket.send("comment sent");
    } catch (error) {
      console.error("There was an error! Error:", error);
      alert(
        "There was an error with your comment submission. Please try again."
      );
    }
    // Revert the button text after load is complete.
    setIsLoading(false);

    // Set the state back to blank so that the user can submit more comments.
    setNameInput("");
    setCommentInput("");
  };

  useEffect(() => {
    // Sometimes the websocket automatically closes after inactivity, making sure this doesn't happen. 
    webSocket.addEventListener('close', setUpWebSocket)
  },[webSocket]);

  return (
    <div className="comment-form">
      <form>
        <label className="comment-form__label" htmlFor="name">
          Your name:
        </label>
        <input
          className="comment-form__name-input"
          type="text"
          id="name"
          maxLength="50"
          value={nameInput}
          onChange={handleNameChange}
        />
        <label className="comment-form__label" htmlFor="comment">
          Comment:
        </label>
        <textarea
          className="comment-form__comment-input"
          name="comment"
          id="comment"
          cols="40"
          rows="20"
          maxLength="750"
          value={commentInput}
          onChange={handleCommentChange}
        ></textarea>
        <div className="comment-form__submit">
          <button onClick={submitCommentHandler}>
            {isLoading ? "Submitting..." : "Submit Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
