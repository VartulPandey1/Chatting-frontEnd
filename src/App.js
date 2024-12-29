import './App.css';
import MainScreen from './screen';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './login';
// import { Children } from 'react';
import Signup from './Signup';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login'element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/main' element={<MainScreen/>}/>
    </Routes>

    </BrowserRouter>
  )
}
    
          


export default App;
