import "../css/CommentForm.css";
import { useState } from "react";

const CommentForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    // Basic validation to make sure the inputs aren't blank.
    if (nameInput.trim().length === 0 && commentInput.trim().length === 0) {
      alert("Please enter a valid name and comment.");
      return;
    } else if (nameInput.trim().length === 0) {
      alert("Please enter a valid name.");
      return;
    } else if (commentInput.trim().length === 0) {
      alert("Please enter a valid comment.");
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
    }
    try {
      const response = await fetch("/createComment", requestData);
      if (!response.ok) {
        throw new Error('Comment request failed!');
      }
    } catch (error) {
        console.error("There was an error! Error:", error);
        alert(
          "There was an error with your comment submission. Please try again."
        );
    }

    // fetch("/createComment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(commentData),
    // })
    //   .then((response) => response.json())
    //   .catch((error) => {
    //     console.error("There was an error! Error:", error);
    //     alert(
    //       "There was an error with your comment submission. Please try again."
    //     );
    //   });

    // Set the state back to blank so that the user can submit more comments.
    setNameInput("");
    setCommentInput("");
  };

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
          value={commentInput}
          onChange={handleCommentChange}
        ></textarea>
        <div className="comment-form__submit">
          <button onClick={submitCommentHandler}>Submit Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
