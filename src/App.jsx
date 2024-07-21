import './App.css';
import { Route, useLocation } from 'wouter';
import FeedVideos from './components/FeedVideos/index.jsx';
import Upload from './pages/Upload/index.jsx';
import Footer from './components/Footer/index.jsx';
import Login from './pages/Login/index.jsx';

function App() {
  function ConditionalFooter() {
    const location = useLocation();
    return location[0] !== '/' ? (
      <footer className='footer'>
        <Footer />
      </footer>
    ) : null;
  }

  return (
    <div className='app'>
      <main>
        <Route path='/'>
          <Login />
        </Route>
        <Route path='/feed'>
          <FeedVideos />
        </Route>
        <Route path='/upload'>
          <Upload />
        </Route>
      </main>
      <ConditionalFooter />
    </div>
  );
}

export default App;
