import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { usersignuproute } from './api/apiroutes';

const Signup = () => {
  const router = useRouter()
  const [signloading, setsignLoading] = useState(false); 

        const [values,setvalues]=useState({
          email:"",
          password:"",
          firstname:"",
          lastname:"",
          gender:"",
          birthday:"",
          phonenumber:"",
          confirmPassword:""
        });

        const handlechange=(e)=>{
          setvalues({...values,[e.target.name]:e.target.value})
     
         }


  const handlesubmit = async (e) => {
    e.preventDefault();
    if (handlevalidation()) {
      toast.loading('signing  in please wait',{duration:4000})
      try {
        setsignLoading(true);
        const {email,
          password,
          firstname,
          lastname,
          gender,
          birthday,
          phonenumber}=values

        const { data } = await axios.post(usersignuproute, {
          email,
          password,
          firstname,
          lastname,
          gender,
          birthday,
          phonenumber
        });
        if (data.status === false) {
          toast.error(data.msg);
          setsignLoading(false)
        }
        if (data.status === true) {
          localStorage.setItem('chat-nexus-user', JSON.stringify(data.user));
          toast.success('User registered successfully!');
          window.location.href = '/';
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      } finally {
        setsignLoading(false); 
      }
    }
  };

  const handleTypeChange = (e)=>{
    e.preventDefault()
    if (inputType === 'text') {
      setInputType('password');
    } else {
      setInputType('text');
    }
  }




  

  
  

  const handlevalidation=()=>{
    const {email,password,confirmPassword}=values

    if(password!==confirmPassword){
    toast.error("password and confirm password must be same")
    setsignLoading(false)
    return false;
  }else if (email===""){
    toast.error("email must not be empty")
    setsignLoading(false)
    return false;
  }else if (password.length<8){
    toast.error("password must have more than 8 characters ")
    setsignLoading(false)
    return false;
  }
  return true
}

  return (<>
  <Toaster/>
    <section className="bg-[#0A0B0D] text-white pt-20">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider capitalize">
              Get your free account now.
            </h1>

            <p className="mt-4">
              Let’s get you all set up so you can verify your personal account and begin setting up your profile.
            </p>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={(e)=>handlesubmit(e)}>
              <div>
                <label htmlFor='firstName' className="block mb-2 text-sm">First Name</label>
                <input id='firstName' name='firstname' onChange={(e)=> handlechange(e)} type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>


              <div>
                <label htmlFor='lastName' className="block mb-2 text-sm">Last name</label>
                <input id='lastName' name='lastname'  onChange={(e)=> handlechange(e)} type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='gender' className="block mb-2 text-sm">Gender</label>
                <select id='gender' name='gender' onChange={(e)=> handlechange(e)} className="block mb-2 text-sm w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
                  <option defaultValue className="block mb-2 text-sm text-gray-700">Select your gender</option>
                  <option className="block mb-2 text-sm text-gray-700">Male</option>
                  <option className="block mb-2 text-sm text-gray-700">Female</option>
                  <option className="block mb-2 text-sm text-gray-700">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor='birthday' className="block mb-2 text-sm">Birthday (dd/mm/yyyy)</label>
                <input id='birthday' name='birthday'  onChange={(e)=> handlechange(e)} type="text" placeholder="20/10/2003" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='number' className="block mb-2 text-sm">Phone number</label>
                <input id='number' name='phonenumber'  onChange={(e)=> handlechange(e)} type="number" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='email' className="block mb-2 text-sm">Email address</label>
                <input id='email' name='email' onChange={(e)=> handlechange(e)} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='password' className="block mb-2 text-sm">Password</label>
                <input id='password' name='password'  onChange={(e)=> handlechange(e)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='confirmPassword' className="block mb-2 text-sm">Confirm password</label>
                <input id='confirmPassword' name='confirmPassword'  onChange={(e)=> handlechange(e)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <button type='submit'
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Sign Up </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <p className="mt-6 text-sm md:text-left text-center text-gray-400 flex">Already have an account? <Link href='/login'><span className="text-blue-500 focus:outline-none focus:underline hover:underline ml-1">Sign in</span></Link>.</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Signup