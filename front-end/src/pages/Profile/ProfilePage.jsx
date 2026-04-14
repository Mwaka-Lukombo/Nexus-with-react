import {
  useState,
  useEffect
} from 'react'
import { authStore } from '../../store/authStotre';
import { Camera, Heart, MessageCircle, User } from 'lucide-react';

export const ProfilePage = () => {
  const [page, setPage] = useState("profile");
   const [image, setImage] = useState(null);

  const {
    userAuth,
    updatePorfile,
    isUpdateding
  } = authStore();

  const handleSubmit = (e)=>{
    e.preventDefault();
  }

  const handleImage = (e)=>{
    const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async ()=>{
        const base64Image = reader.result;
        setImage(base64Image);
        updatePorfile({profileImage:base64Image});
        setImage("");
      }



  }
  
  
  return (
    <div className='p-2'>
      <div className='grid md:grid-cols-2'>
        <div onClick={()=> setPage("profile")} className={`transition-all duration-300 col-span-1 h-[40px] cursor-pointer text-black ${page === 'profile' && "bg-secundary-color text-white"} flex items-center justify-center`}>
           <span>My Profile</span>
        </div>

        <div onClick={()=> setPage("storedPage")} className={`transition-all duration-300 h-[40px] cursor-pointer col-span-1 flex items-center justify-center ${page === 'storedPage' && "bg-secundary-color text-white"}`}>
           <span>My Stored</span>
        </div>
      </div>



      <div className='my-7'>
        {page === 'profile' && (
          <>
            <div className='max-w-[700px] mx-auto shadow-xl border border-[#ccc] rounded-xl px-2'>
              <form onSubmit={handleSubmit} className='flex items-center justify-center pt-8 '>
                <div className='relative w-[90px] h-[90px]  flex items-center justify-center rounded-full'>
                  <img src={userAuth.profileImg || image || "/user.png"} 
                  className={`${userAuth?.profileImg && "w-full h-full"} w-[50px] h-[50px] bg-contain bg-center bg-no-repeat`}
                  />

                  <label disabled={isUpdateding} className={`${isUpdateding && "bg-black/80 animate-pulse"} absolute bottom-0 right-0 w-[30px] h-[30px] bg-secundary-color text-white flex items-center justify-center rounded-full cursor-pointer`}>
                    <input type="file" 
                    accept='image/*'
                    className='hidden'
                    onChange={(e)=> handleImage(e)}
                    />
                    <Camera className='size-5' />
                  </label>
                  
                </div>
              </form>

              <form>
                 
                 {userAuth?.typeUser === 'student' ? (
                  <>

                  <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Course:</div>
                  </div>

                  <input type="text"  
                   placeholder='Engenharia informatica'
                   value={userAuth?.course || ""}
                  className='input input-bordered'
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Year:</div>
                  </div>

                  <input type="text"  
                   placeholder='Engenharia informatica'
                   value={userAuth?.year || ""}
                  className='input input-bordered'
                  />
                 </div>

                 

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Password:</div>
                  </div>

                  <input type="text"  
                   placeholder='*****'
                  className='input input-bordered'
                  />
                 </div>
                  </>
                 ) : 
                 <>
                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Fullname:</div>
                  </div>

                  <input type="text"  
                  disabled
                  value={userAuth?.fullname}
                  className='input input-bordered'
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Email:</div>
                  </div>

                  <input type="text"  
                  disabled
                  value={userAuth?.email}
                  className='input input-bordered'
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Password:</div>
                  </div>

                  <input type="text"  
                  placeholder='*****'
                  className='input input-bordered'
                  />
                 </div>
                 </>
                 }

                 <button className='my-5 btn bg-secundary-color text-white hover:bg-hover'>Update</button>
              </form>
            </div>
          </>
        )}

        {page === 'storedPage' && (
          <div className='my-4 w-[100%] md:w-[50%] h-[700px] border border-[#ccc] shadow-xl rounded-xl mx-auto'>
                          <div className='p-2 flex items-center  gap-3'>
                             <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full border border-[#ccc]'>
                                <User />
                             </div>
          
                             <div>
                                <h3 className='text-sm font-normal'>{userAuth?.fullname}</h3>
                                <p className='text-xs font-bold'>Old student</p>
                             </div>
          
                             <div>
                               <h3 className='text-sm text-[#ccc]'>12 min</h3>
                               <span className='text-transparent'>a</span>
                             </div>
                          </div>
          
                          <div className='w-full h-[85%]'>
                            <img src={'sasasasasasasas'}  
                            className='w-full h-full bg-cover bg-center bg-no-repeat'
                            />
                          </div>
          
                          <div className='w-full h-[5%] flex items-center gap-3 px-3'>
                            <div className='flex items-center'>
                              <Heart />
                              <span className='px-1'>13</span>
                            </div>
                            <div className='flex items-center'>
                             <MessageCircle />
                             <span className='px-1'>54</span>
                            </div>
                          </div>
                        </div>
        )}
      </div>    
    </div>
  )
}
