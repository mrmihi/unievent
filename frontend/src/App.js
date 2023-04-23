import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AnimatedRoutes from './routes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter></BrowserRouter>
    </div>
  );
};

export default App;
