import './css/App.css';
import CommentForm from './components/CommentForm';
import CommentsFeed from './components/CommentsFeed';

function App() {
  return (
    <div className="container">
      <div className="introduction">
        <h1>Comments Feed</h1>
      </div>
      <CommentForm />

      <CommentsFeed />
    </div>
  );
}

export default App;
