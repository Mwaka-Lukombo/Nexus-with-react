import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import {
  VoidElements
} from '../../components/common/VoidElements'
import { campusStore } from '../../store/campuStore';
import {authStore} from '../../store/authStotre';
import { CampusSkeleton } from '../../components/skeletons/CampusSkeleton';
import { TotalElments } from '../../components/common/TotalElments';

export const Campus = () => {

const [campusPage,setCampusPage] = useState("allStudents");
  const {
    isLoading,
    isMyFriend,
    getAllStudents,
    students,
    myFriendsSolicitations,
    mySolicitations,
    friendSolicitations,
    Friends,
    myFriends,
    addFriend,
    acceptFriend,
    rejectFriend,
    removeFriend
  } = campusStore();

  const {
    userAuth
  } = authStore();


  useEffect(()=>{
    getAllStudents();
  },[getAllStudents]);

  useEffect(()=>{
    mySolicitations();
  },[mySolicitations]);

  useEffect(()=>{
    myFriends();
  },[myFriends]);



  if(isLoading || isMyFriend){
    return <CampusSkeleton />
  }
  

  



  const FriendsId = [];
  const AllStudents = [];

  for(let i = 0; i < Friends.length; i++){
     const id = Friends[i]?._id;
     if(!FriendsId.includes(id)){
      FriendsId.push(id)
     }
  }


  for(let i = 0; i < students?.users?.length;i++){
     const student = students?.users[i];
     AllStudents.push(student)
  }

const friendsIds = Friends.map(friend => friend._id);

const filteredUsers = students?.users?.filter(
  student => !friendsIds.includes(student._id)
);
  

console.log(students)



  return (

    <>
    <div className='p-3'>

          <div className='grid  grid-cols-1 md:grid-cols-3 gap-3'>

             <div onClick={()=> setCampusPage("allStudents")} className='transition-all flex items-center justify-center col-span-1 h-[30px] relative cursor-pointer'>
              <span>All Students</span>
              {campusPage === "allStudents" && <div className='absolute bottom-[-10px] w-[60px] rounded-xl h-[10px] bg-secundary-color'></div>}
             </div>

             <div onClick={()=> setCampusPage("solicitations")} className='transition-all flex items-center justify-center col-span-1 h-[30px] relative cursor-pointer'>
              <span>My Solicitaions</span>
              {campusPage === "solicitations" && <div className='absolute bottom-[-10px] w-[60px] rounded-xl h-[10px] bg-secundary-color'></div>}
             </div>

             <div onClick={()=> setCampusPage("myFriends")} className='transition-all flex items-center justify-center col-span-1 h-[30px] relative cursor-pointer'>
              <span>My friends</span>
              {campusPage === "myFriends" && <div className='absolute bottom-[-10px] w-[60px] rounded-xl h-[10px] bg-secundary-color'></div>}
             </div>
          </div>
          
          <>
          <h3 className='text-2xl mb-4 text-secundary-color font-bold'>Campus</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
          {campusPage === "allStudents" && (
            <>
            
            {/* users */}

            {filteredUsers?.length === 0  && (
              <VoidElements text={'All are you friends'} emoji={"🙂‍↕️"} />
            )}
            
          {Array.isArray(filteredUsers) && filteredUsers.map((user)=> (
              <div
            key={user._id}
            className="col-span-1 w-full bg-white border border-[rgb(114,16,17)] rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {/* profile */}
            
                <div className='w-20 h-20 rounded-full flex items-center justify-center border-2 border-secundary-color'>
                <img src={user.profileImg || "/avatar.png"} 
                
                className='w-full h-full bg-cover bg-no-repeat rounded-full'
                />
                </div>
          

            {/* Nome */}
            <h2 className="text-lg font-semibold text-[rgb(114,16,17)]">
              {user.fullname}
            </h2>

            {/* Curso */}
            <p className="text-sm text-gray-600 mb-4">
              {user.course}
            </p>
           <div className="flex flex-col gap-2 w-full items-center">
              {user.friends?.includes(user._id) ? (
                <Link
                  
                  className="flex items-center justify-center gap-2 w-[70%] btn bg-success text-white cursor-not-allowed hover:bg-success"
                >
                  <Check />
                  <span>Friend</span>
                </Link>
                // not pressistent in dataBase
              ) : myFriendsSolicitations.includes(user._id) ? (

                <button
                  disabled
                  className="bg-gray-300 text-white cursor-not-allowed bg-error px-4 py-2 rounded-xl w-[70%]"
                >
                  Pedido enviado
                </button>

              ) : (

                
                <button
                  onClick={() => addFriend(user._id)}
                  className="bg-[rgb(114,16,17)] text-white px-4 py-2 rounded-xl hover:bg-[rgb(140,25,26)] transition w-[70%]"
                >
                  Adicionar amigo
                </button>

              )}
            </div>
          </div>

            ))}
            
            <div className='col-span-4 flex gap-2 items-center justify-center'>
                {[...Array(students?.totalPages)].map((_,index)=> {
                  const currentPage = index + 1;

                  return (
                    <input 
                   className="join-item btn btn-square" 
                   type="radio"
                   name="options" 
                   aria-label={currentPage}
                   checked={students?.currentPage === currentPage || currentPage === 1} 
                   onClick={()=> getAllStudents(currentPage)}
                  />
                  )
                })}
            </div>
            </>  
          )}

                  {/* Solicitations */}

        {campusPage === "solicitations" && (
          <>

          {friendSolicitations.length === 0 && <VoidElements text="Youre dont have friends solicitations " emoji={"👻"} />}
            {Array.isArray(friendSolicitations) && friendSolicitations.map((pFriend)=> (
              <div className='py-3 col-span-1 min-h-[200px] rounded-xl border-2 border-secundary-color'>
              <div className='flex items-center justify-center w-[75px] h-[75px] mx-auto rounded-full border-2 border-[#111]'>
                <img src={pFriend.profileImg || "/avatar.png"} 
                
                className='w-full h-full bg-cover bg-no-repeat'
                />
              </div>

              <div className='flex flex-col justify-center text-center'>
                 <h3 className='text-sm font-bold my-2'>{pFriend.from.fullname}</h3>
                 <p className='text-xs'>{pFriend.from.typeUser}</p>
              </div>
              
              <div className='flex items-center my-2 justify-center gap-3'>
                 <button onClick={()=> rejectFriend(pFriend?._id)} className="btn w-[40%] bg-error text-white hover:badge-error">Reject</button>
                 <button onClick={()=> acceptFriend(pFriend?.from?._id,pFriend)} className="btn w-[40%] bg-success text-white hover:bg-green-400">Accept</button>
              </div>
              
            </div>
            ))}
          </>
        )}

         {/*MyFriends  */}
        {campusPage === "myFriends" && (
          
          <>
          
          {Friends.length === 0 && <VoidElements text="Your dont have Friends" emoji={"🧐"} />}
            {Array.isArray(Friends) && Friends.map((Friend)=> (
              <div className=' py-3 col-span-1 w-full min-h-[200px] rounded-xl border-2 border-secundary-color'>
              <div className='flex items-center justify-center w-[75px] h-[75px] mx-auto rounded-full border-2 border-[#111]'>
                <img src={Friend.profileImg || "/avatar.png"} 
                
                className='w-full h-full bg-cover bg-no-repeat rounded-full'
                />
              </div>

              <div className='flex flex-col justify-center text-center'>
                 <h3 className='text-sm font-bold my-2'>{Friend.fullname}</h3>
                 <p className='text-xs'>{Friend.email}</p>
              </div>
              
              <div className='flex flex-col-reverse items-center px-2 my-2 justify-center gap-3'>
                 {/* <Link to={`/${Friend._id}`} className="border-b border-[#ccc] w-full flex items-center justify-center text-blue-500 underline text-sm">Porfile</Link> */}
                  <button onClick={()=> removeFriend(Friend._id)} className="w-full btn bg-error text-white hover:bg-red-500 transition-colors">Remove Friend</button>
              </div>
              
            </div>
            ))}
          </>
        )}


        
      </div>
          </>
          
          <div className='w-[100%] h-[40px] flex items-center justify-center   my-4'>
              <div className="join">
                 {/* allStudents */}

                 {campusPage === "allStudents" && (
                  <>
                  
                
                  </>
                 )}

                 
              </div>
          </div>
         </div>

    </>
  )
}
