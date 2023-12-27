import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact';
import Blog from './pages/Blog'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

import Header from './components/Header'
import Footer from './components/Footer'
import Single from './pages/Single';
import 'react-toastify/dist/ReactToastify.min.css';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/my-blogs' element={<MyBlogs />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        {/* <Route path='/logout' element={<Home />}></Route> */}
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/blog/single/:slug' element={<Single />}></Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
