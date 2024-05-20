import { useState } from 'react';
import Table from './Table';
import { FaCircleUser } from "react-icons/fa6";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

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
  const [clicked, setClicked] = useState(false);

  return (
    <Link className='w-min p-3' to={"/login"}>
      <button className='flex'>
        <FaCircleUser className='text-white m-4 w-7 h-7' />
        <span className='self-center text-white'>Accedi</span>
    </button>
    </Link>
  )
}

const Login = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <form action='http://localhost:4000/login' method='post' className='bg-gray-700 flex flex-col p-3 w-fit h-fit rounded-2xl'>
        <div className='flex p-3 pb-0'>
          <label htmlFor="username" className='p-3 text-white'>Username:</label>
          <input type="text" name='username' id='username' className='h-min w-full self-center rounded-2xl' required />
        </div>

        <div className='flex p-3'>
          <label htmlFor="password" className='p-3 text-white'>Password:</label>
          <input type="password" name='password' id='password' className='h-min w-full self-center rounded-2xl' required />
        </div>

        <input type="submit" value={"Accedi/Registrati"} className='cursor-pointer bg-white rounded-2xl h-8'/>
      </form>
    </div>
  )
}

export default App;