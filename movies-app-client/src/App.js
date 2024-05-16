import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import MoviePage from './MoviePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:id' element={<MoviePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
