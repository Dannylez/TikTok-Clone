import './App.css';
import { Route } from 'wouter';
import FeedVideos from './components/FeedVideos/index.jsx';
import Upload from './pages/Upload/index.jsx';
import Footer from './components/Footer/index.jsx';

function App() {
  return (
    <div className='app'>
      <main>
        <Route path='/'>
          <FeedVideos />
        </Route>
        <Route path='/upload'>
          <Upload />
        </Route>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
