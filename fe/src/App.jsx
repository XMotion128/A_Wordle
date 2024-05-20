import { useEffect, useState } from 'react';
import Table from './Table';
import { FaCircleUser } from "react-icons/fa6";
import {BrowserRouter, Routes, Route, Link, redirect, useNavigate} from "react-router-dom"

const App = () => {
  return (
  <BrowserRouter>
      <Routes>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

const Index = () => {
  return (
    <>
      <Bar />
      <h1 className='self-center text-2xl p-4 text-green-500 font-bold'>Another Wordle</h1>
      <Table />
    </>
  )
}

const Bar = () => {
  const [user, setUser] = useState(sessionStorage.getItem("Username"));

  return (
    <>
      {user ? (
        <div className="flex">
          <FaCircleUser className="text-white m-4 w-7 h-7" />
          <span className="self-center text-white">{user}</span>
        </div>
      ) : (
        <Link className="w-min p-3" to="/login">
          <button className="flex">
            <FaCircleUser className="text-white m-4 w-7 h-7" />
            <span className="self-center text-white">Accedi</span>
          </button>
        </Link>
      )}
    </>
  );
}

const Login = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevState => ({
     ...prevState,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = {
      username: inputValues.username,
      password: inputValues.password
    };

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      if (data == true) {
        sessionStorage.setItem("Username", formData.username)
        sessionStorage.setItem("password", formData.password)
        navigate("/")
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  };
  
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <form onSubmit={handleSubmit} action='http://localhost:4000/login' method='post' className='bg-gray-700 flex flex-col p-3 w-fit h-fit rounded-2xl'>
        <div className='flex p-3 pb-0'>
          <label htmlFor="username" className='p-3 text-white'>Username:</label>
          <input type="text" name='username' id='username' value={inputValues.username} onChange={handleInputChange} className='h-min w-full self-center rounded-2xl' required />
        </div>

        <div className='flex p-3'>
          <label htmlFor="password" className='p-3 text-white'>Password:</label>
          <input type="password" name='password' id='password' value={inputValues.password} onChange={handleInputChange} className='h-min w-full self-center rounded-2xl' required />
        </div>

        <input type="submit" value={"Accedi/Registrati"} className='cursor-pointer bg-white rounded-2xl h-8'/>
      </form>
    </div>
  )
}

export default App;