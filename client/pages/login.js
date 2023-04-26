import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { userloginroute } from './api/apiroutes'
import { Toaster, toast } from 'react-hot-toast'




const Login = () => {
  const router = useRouter()
  const [inputType, setInputType] = useState('password');
  const [values, setvalues] = useState({
    password: "",
    email: "",
  })
  const [loginloading, setloginLoading] = useState(false);





  const handlechange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (handlevalidation()) {
      setloginLoading(true)
      toast.loading('logging in please wait', { duration: 4000 })
      const { email, password } = values;
      try {
        const { email, password } = values;
        const { data } = await axios.post(userloginroute, {
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg);
          setloginLoading(false)
        }
        if (data.status === true) {
          localStorage.setItem('chat-nexus-user', JSON.stringify(data.mail));
          toast.success('User logged in successfully!');
          window.location.href = '/';
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      } finally {
        setloginLoading(false)
      }
    }

  };










  const handleTypeChange = (e) => {
    e.preventDefault()
    if (inputType === 'text') {
      setInputType('password');
    } else {
      setInputType('text');
    }
  }





  const handlevalidation = () => {
    const { email, password } = values
    if (email.length === 0) {
      toast.error(" email must not be empty")
      setloginLoading(false)
      return false;
    }
    else if (password.length === 0) {
      toast.error(" password must not be empty")
      setloginLoading(false)
      return false;
    }
    return true
  }

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }






  return (
    <>
      <Toaster />
      <div className="bg-[#0A0B0D] text-white pt-20">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Podscape</h2>

                <p className="max-w-xl mt-3">
                  Real People, Real Stories, Real Talk
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="flex flex-col items-center">

                <Image src='/logo.png' alt='logo' height={250} width={200} />
                <p className="text-2xl text-center">
                  Welcome back<span className='text-sky-500'>!</span>
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={(e) => handlesubmit(e)}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">Email Address</label>
                    <input onChange={(e) => handlechange(e)} type="text" name="email" id="emailOrNumber" placeholder="Email or Number" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm">Password</label>
                      <Link href='/forgot'><div className="text-sm text-blue-500 hover:underline">Forgot password?</div></Link>
                    </div>

                    <input onChange={(e) => handlechange(e)} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>

                    <p className="mt-4 text-center">or sign in with</p>
                    <div className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg hover:bg-black/60 cursor-pointer">
                      <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                      </svg>
                      <span className="mx-2" data-onsuccess="onSignIn">Sign in with Google</span>
                    </div>
                  </div>
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link href='/signup'><span className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</span></Link>.</p>
                <p className="mt-4 text-sm text-center text-gray-400"><Link href='/signup-creator'><span className="text-blue-500 focus:outline-none focus:underline hover:underline">Creator Sign up</span></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
