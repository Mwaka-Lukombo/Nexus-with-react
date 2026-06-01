import React,{useState} from 'react';
import {Lock, Mail, User, X} from 'lucide-react'
import { LoaderComponent } from '../../../components/common/LoaderComponent';
import { authStore } from '../../../store/authStotre';

export const LoginPage = () => {
  const [showForm,setShowForm] = useState(false);
   const [fullname,setFullname] = useState("");
    const [email,setEmail] = useState("");
     const [password,setPassword] = useState("");

       const {sign,isCreate,isLogging,login} = authStore();
       


  const handleForm = ()=>{
    setShowForm((prev) => !prev);
  }

  const resetForm = ()=>{
    setFullname("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (e)=>{
     e.preventDefault();

     const newUser = {
      fullname,
      email,
      password
     }
     sign(newUser);
     resetForm();
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    login({email,password});
    resetForm();
  }
  
  return (
    <>

    {showForm && (
      <>
       <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-black/90'>

         <div className='absolute top-7 right-10'>
           <X onClick={handleForm} className='text-white cursor-pointer' />
         </div>

          <div className='w-[450px] p-3 min-h-[300px] shadow-xl border border-[#ccc] rounded-xl'>
            <div className='w-[250px] h-[70px]'>
              <img src="/assent/logo-1.png" alt="" />
           </div>
            <form onSubmit={handleSubmit}>
              <div className='form-control relative'>
               <div className='label'>
                  <span className='label-text'>Full name:</span>
               </div>

               <input type="text" 
               className='input input-bordered'
               placeholder='Jhon Doe'
               onChange={(e)=> setFullname(e.target.value)}
               value={fullname || ""}
               />
               <User className='absolute top-[55%] right-2'/>
             </div>
             <div className='form-control relative'>
               <div className='label'>
                  <span className='label-text'>E-mail:</span>
               </div>

               <input type="text" 
               className='input input-bordered'
               placeholder='Jhondoe@gmail.com'
               onChange={(e) => setEmail(e.target.value)}
               value={email || ""}
               />
               <Mail className='absolute top-[55%] right-2' />
             </div>

             <div className='form-control relative'>
               <div className='label'>
                 <span className='label-text'>Password:</span>
               </div>
               
               <input type="password" 
               className='input input-bordered'
               placeholder='*******'
               onChange={(e) => setPassword(e.target.value)}
               value={password || ""}
               />
               <Lock className='absolute top-[55%] right-2' />
             </div>

              <div className='my-3 flex items-center justify-center'>
                <button className='w-full btn bg-secundary-color text-white hover:bg-hover transition-colors' disabled={isCreate}>
                {!isCreate ? "Register" : <LoaderComponent size={4} />}
               </button>
              </div>
             </form>
          </div>
       </div>
      </>
    )}
    
    <div className=' py-[130px] px-8  mx-auto h-screen max-w-[1250px]'>
      <div className='grid md:grid-cols-2 gap-5 items-center'>
        <div className=' hidden col-span-1 md:flex items-center justify-center h-[450px] rounded-xl border border-[#ccc] shadow-xl'>
          <img src="/assent/Logo.png"
          className='w-[350px] h-[350px] bg-cover bg-center bg-no-repeat' 
          alt="" />
        </div>

        <div className='relative top-[50%] translate-y-[-50%] md:translate-y-[0%] md:top-0 p-3 col-span-1 min-h-[200px]  shadow-xl border border-[#ccc] rounded-xl'>
           <div className='w-[250px] h-[70px]'>
              <img src="/assent/logo-1.png" alt="" />
           </div>

           <form onSubmit={handleLogin} className='my-4 w-full'>
             <div className='form-control relative'>
               <div className='label'>
                  <span className='label-text'>E-mail:</span>
               </div>

               <input type="text" 
               className='input input-bordered'
               placeholder='Jhondoe@gmail.com'
               onChange={(e) => setEmail(e.target.value)}
               value={email || ""}
               />
               <Mail className='absolute top-[55%] right-2' />
             </div>

             <div className='form-control relative'>
               <div className='label'>
                 <span className='label-text'>Password</span>
               </div>
               
               <input type="password" 
               className='input input-bordered'
               placeholder='*******'
               onChange={(e) => setPassword(e.target.value)}
               value={password || ""}
               />
               <Lock className='absolute top-[55%] right-2' />
             </div>

             <div className='my-3 flex items-center justify-between'>
               <button className='btn bg-secundary-color text-white hover:bg-hover transition-colors' disabled={isLogging}>
                {!isLogging ? "Enviar" : <LoaderComponent size={4} />}
               </button>

               <div>
                 <span onClick={handleForm} className='label-text underline cursor-pointer text-hover '>Criar conta</span>
               </div>
             </div>
           </form>
        </div>
      </div>
    </div>
    </>
  )
}
