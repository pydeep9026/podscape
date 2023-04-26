import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import FileBase64 from 'react-file-base64'
import { speakersignuproute } from './api/apiroutes';
import { toast,Toaster } from 'react-hot-toast';
import axios from "axios"

const Signup = () => {
  const router = useRouter()
  const [signloading, setsignLoading] = useState(false); 
  const [inputType, setInputType] = useState('password');
  const[values,setvalues]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:"",
        speakerdescription:"",
        photo:"",
  })


    const handlechange=(e)=>{
     setvalues({...values,[e.target.name]:e.target.value})

    }
    const handlephoto=(base64)=>{
      setvalues({...values,photo:base64.base64})
    }

    


    const handlesubmit = async (e) => {
      e.preventDefault();
      if (handlevalidation()) {
        toast.loading('signing  in please wait',{duration:4000})
        const { name, email, password, photo ,speakerdescription} = values; 
        try {
          setsignLoading(true);
          const { data } = await axios.post(speakersignuproute,{
            name,
            speakerdescription,
            email,
            password,
            photo,
          });
          
          if (data.status === false) {
            toast.error(data.msg);
            setsignLoading(false)
          }
          if (data.status === true) {
            localStorage.setItem('chat-nexus-user', JSON.stringify(data.user));
            toast.success('User registered successfully!');
            window.location.href = '/creator/dashboard';
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
      const{name,email,password,confirmpassword,photo}=values
      if(password!==confirmpassword){
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
    }else if (name.length<6){
      toast.error("username must have more than 6 characters")
      setsignLoading(false)
      return false;
    }else if (photo===""){
      toast.error("please upload profile picture")
      setsignLoading(false)
      return false;
    }
    return true
  }
  /*email,
        name,
        password:hashedpassword,
        photo,
        speakerdescription*/

  return (<>
  <Toaster/>
    <section className="bg-[#0A0B0D] text-white pt-20">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider capitalize">
              Make your creator account today
            </h1>

            <p className="mt-4">
              Let’s get you all set up so you can verify your creator account and begin setting up your profile.
            </p>


            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={(e)=>handlesubmit(e)}>
            <div style={{ gridColumn: "span 2 " ,display: "flex", justifyContent: "center" }}>
            <label className="profilelab ">
        <FileBase64
        type="file"
        onDone={handlephoto}
      />
      <div className="photoupload" style={{ position: "relative",left:"75px" }}>
        {values.photo ? (
          <img src={values.photo} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "250px" }} />
        ) : (
          <div
            style={{
              width: "11vh",
              height: "11vh",
              backgroundColor: "lightgray",
              borderRadius: "250px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              document.querySelector('input[type="file"]').click();
            }}
          >
           <svg height="133.441" viewBox="0 0 133.441 133.441" width="133.441" xmlns="http://www.w3.org/2000/svg"><path d="m132.441 66.72c0 16.391-6.001 31.375-15.935 42.883-12.043 13.984-29.879 22.838-49.785 22.838-19.292 0-36.633-8.309-48.656-21.54-10.598-11.677-17.065-27.166-17.065-44.181 0-36.296 29.424-65.72 65.72-65.72s65.72 29.424 65.72 65.72z" fill="#fff"/><path d="m66.72 133.441c-18.763 0-36.768-7.971-49.396-21.867-11.172-12.311-17.324-28.239-17.324-44.854 0-36.79 29.931-66.72 66.72-66.72s66.72 29.931 66.72 66.721c0 15.989-5.745 31.45-16.178 43.536-12.689 14.733-31.111 23.185-50.542 23.185zm0-131.441c-35.687 0-64.72 29.033-64.72 64.72 0 16.116 5.968 31.568 16.805 43.509 12.25 13.48 29.715 21.212 47.916 21.212 18.848 0 36.718-8.197 49.028-22.49 10.12-11.724 15.693-26.722 15.693-42.23-.001-35.688-29.035-64.721-64.722-64.721z" fill="#112c41"/><circle cx="66.722" cy="51.969" fill="#9797f7" r="26.881"/><path d="m116.506 109.603c-12.043 13.984-29.879 22.838-49.785 22.838-19.292 0-36.633-8.309-48.656-21.54 9.171-14.568 27.958-24.551 49.647-24.551 21.035 0 39.347 9.398 48.795 23.254z" fill="#9797f7"/><path d="m66.72 133.441c-18.763 0-36.768-7.971-49.396-21.867-11.172-12.311-17.324-28.239-17.324-44.854 0-36.79 29.931-66.72 66.72-66.72s66.72 29.931 66.72 66.721c0 15.989-5.745 31.45-16.178 43.536-12.689 14.733-31.111 23.185-50.542 23.185zm0-131.441c-35.687 0-64.72 29.033-64.72 64.72 0 16.116 5.968 31.568 16.805 43.509 12.25 13.48 29.715 21.212 47.916 21.212 18.848 0 36.718-8.197 49.028-22.49 10.12-11.724 15.693-26.722 15.693-42.23-.001-35.688-29.035-64.721-64.722-64.721z" fill="#112c41"/></svg>
          </div>
          
        )}
      </div>
      <div style={{ marginTop: "1vh",marginBottom:"1vh",fontSize:"1.6vh" }}>
        Please upload your profile picture
      </div>
        </label>
        </div>
  <div>
    <label htmlFor='firstName' className="block mb-2 text-sm">Name</label>
    <input id='firstName' name='name'  onChange={(e)=> handlechange(e)} type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
  </div>
  
  <div>
    <label htmlFor='lastName' className="block mb-2 text-sm">Email</label>
    <input id='lastName' name='email'  onChange={(e)=> handlechange(e)} type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
  </div>
  
  <div className="col-span-2">
    <label htmlFor='description' className="block mb-2 text-sm">Speaker Description</label>
    <textarea id='description' name='speakerdescription'  onChange={(e)=> handlechange(e)} placeholder="Enter speaker description" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
  </div>
 
  <div>
    <label htmlFor='password' className="block mb-2 text-sm">Password</label>
    <input id='password' name='password'  onChange={(e)=> handlechange(e)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
  </div>

  <div>
    <label htmlFor='confirmPassword' className="block mb-2 text-sm">Confirm password</label>
    <input id='confirmPassword' name='confirmpassword'  onChange={(e)=> handlechange(e)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
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
            <p className="mt-6 text-sm md:text-left text-center text-gray-400 flex"><Link href='/login-creator'><span className="text-blue-500 focus:outline-none focus:underline hover:underline ml-1">Creator Sign in</span></Link>.</p>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Signup
