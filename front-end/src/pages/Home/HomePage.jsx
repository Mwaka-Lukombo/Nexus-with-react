import React from 'react';
import { Bell } from 'lucide-react';

export const HomePage = ({ user }) => {
  return (
    <div className='px-3 md:px-5'>


      {/* Welcome */}
      <div className='mb-6'>
        <h3 className='text-lg md:text-xl font-medium'>
          Bem-vindo ao Nexus 👋
        </h3>
        <div className='w-[80px] h-[2px] bg-[#111] mt-1'></div>
      </div>

      {/* Card */}
      <div className='w-full min-h-[400px] shadow-md rounded-xl border border-[#ccc]'>

        <div className='flex flex-col md:flex-row'>

          {/* Image */}
          <div className='hidden md:flex items-center justify-center md:w-[30%] h-[350px]'>
            <img
              src="/assent/students.webp"
              className='w-full h-full object-cover rounded-l-xl'
              alt="students"
            />
          </div>

          {/* Content */}
          <div className='flex flex-col justify-center text-center md:text-left p-5 md:w-[70%] border-t md:border-t-0 md:border-l border-[#ccc]'>

            {/* User Info */}
            <h3 className='text-xl md:text-2xl font-semibold mb-2'>
              {user.fullname}
            </h3>

            <p className='text-sm md:text-base text-gray-600 mb-3'>
              {user.email}
            </p>

            <div className='mx-auto md:mx-0 flex items-center justify-center px-4 py-1 rounded-lg bg-secundary-color w-fit'>
              <span className='text-white text-xs md:text-sm'>
                {user.typeUser}
              </span>
            </div>

            {/* Description */}
            <div className='mt-8'>
              <h3 className='text-lg md:text-xl font-bold mb-2'>
                Plataforma de Gestão e Comunicação
              </h3>

              <p className='text-sm md:text-base leading-relaxed text-gray-700'>
                Plataforma integrada para gestão e comunicação entre estudantes e docentes,
                oferecendo uma solução moderna para melhorar a comunicação e a gestão académica
                no campus de Inhamizua.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};