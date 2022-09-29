import '../css/Comment.css';

const Comment = ({name, comment, date}) => {
  const dateObject = new Date(date);
  const day = dateObject.toLocaleDateString("en-US")
  const time = dateObject.toLocaleTimeString("en-US")
  return (
    <div className="comment">
      <p className="comment__message">{comment}</p>
      <p>By: {name} on {day} at {time}</p>
    </div>
  )
}

export default Comment;