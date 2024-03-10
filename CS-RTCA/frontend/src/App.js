import { Route } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
