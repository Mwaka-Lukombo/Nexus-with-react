import { useState } from "react";
import { adminStore } from "../../store/adminStore";
import { useEffect } from "react";
import {
  Loader,
  Trash
} from 'lucide-react';

export const RegisterForm = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    typeUser: "student",
  });

  const [filter, setFilter] = useState("");

  const {
    Allusers,
    getAllUsers,
    createUser,
    isLoading,
    deleteUser
  } = adminStore();

  // Mock de usuários (depois ligas ao backend)
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "João Silva",
      email: "joao@email.com",
      typeUser: "student",
    },
    {
      id: 2,
      fullname: "Maria Costa",
      email: "maria@email.com",
      typeUser: "teacher",
    },
    {
      id: 3,
      fullname: "Carlos Mendes",
      email: "carlos@email.com",
      typeUser: "old student",
    },
  ]);


  useEffect(()=>{
    getAllUsers();
  },[getAllUsers])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      fullname: form.fullname,
      email: form.email,
      password:form.password,
      typeUser: form.typeUser,
    };

    createUser(newUser);

    setForm({
      fullname: "",
      email: "",
      password: "",
      typeUser: "student",
    });
  };

  const filteredUsers =
    filter === ""
      ? Allusers?.users
      : Allusers.users.filter((user) => user.typeUser === filter);

      



  return (
    <div className="w-full min-h-screen bg-gray-100 px-6 py-10 space-y-10">

      {/* FORM */}
      <div className="w-full max-w-4xl mx-auto border border-[#ccc] rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Criar Conta
          </h2>
          <p className="text-sm">Cadastre todo tipo de usuarios na plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
         

          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Nome completo"
            className="px-4 py-3 rounded-lg border outline-none border-gray-300 focus:ring-1 focus:ring-[#721011]"
            
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#721011]"
            
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#721011]"
            
          />

          <select
            name="typeUser"
            value={form.typeUser}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#721011]"
          >
            <option value="student">Estudante</option>
            <option value="old student">Ex-Estudante</option>
            <option value="teacher">Professor</option>
          </select>

          <div className="col-span-2">
            <button disabled={isLoading} className="w-full py-3 rounded-lg bg-[#721011] text-white font-semibold hover:bg-[#8A1A20] transition">
              {!isLoading ? "Criar Conta" : <div className="flex items-center justify-center">
              <Loader className="size-4 animate-spin" />
              </div>}
            </button>
          </div>
        </form>
      </div>

      {/* USERS SECTION */}
      <div className="w-full max-w-6xl mx-auto space-y-6">

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Lista de Usuários
          </h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#721011] w-full md:w-60"
          >
            <option value="">Todos</option>
            <option value="student">Estudantes</option>
            <option value="old student">Ex-Estudantes</option>
            <option value="teacher">Professores</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
            <div
              key={user?._id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {user?.fullname}
                </h4>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

                <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {user?.typeUser}
                </span>
              </div>
              
              <button onClick={()=> {
                if(!confirm("Your need delete this user ?")) return;
                deleteUser(user?._id);
              }} className="w-[80px] h-[30px] bg-error hover:bg-red-500 rounded-lg flex items-center justify-center">
                <Trash className="size-4 text-white" />
              </button>
            </div>
          ))}

         {/* <div className="col-span-3 flex items-center gap-2 justify-center">
            {[...Array(Allusers?.totalPages)].map((_,index)=> {
              const currentPage = index + 1

              return(
                <input 
                  className="join-item btn btn-square" 
                  type="radio" 
                  name="options" 
                  aria-label={currentPage}
                  checked={Allusers?.currentPage === currentPage || currentPage === 1}
                  onClick={() => getAllUsers(currentPage)}
                  />
              )
            })}
         </div> */}

          {filteredUsers?.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              Nenhum usuário encontrado
            </p>
          )}

        </div>
      </div>
    </div>
  );
};