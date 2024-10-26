import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DetailPage from './pages/DetailPage/DetailPage';
import Dashboard from './pages/dashboard/Dashboard';
import Search from './pages/Search/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/course/search' element={<Search />} />
      <Route path='/course/:courseId'  element={<DetailPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
