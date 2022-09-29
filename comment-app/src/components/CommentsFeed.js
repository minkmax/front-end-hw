import { useEffect } from "react";

const CommentsFeed = () => {
  const ws = new WebSocket("ws://localhost:3002");

  
  useEffect(() => {
    ws.addEventListener("message", () => {
      console.log('yo something updated')
    })
  }, [])

  const testFunc = (e) => {
    ws.send("test");
  }
  return (
    <button onClick={testFunc}>asdfasdfasdfasdf</button>
  )
}

export default CommentsFeed;