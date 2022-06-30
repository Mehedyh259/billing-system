import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bills from './pages/Bills';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('accesssToken');
    if (token) {
      setLoggedIn(true)
    }
  }, [])


  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} total={total} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        <Route path='/registration' element={<Registration />} />

        <Route path='/bills' element={
          <RequireAuth>
            <Bills setTotal={setTotal} />
          </RequireAuth>
        } />

        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />

    </>

  );
}

export default App;
