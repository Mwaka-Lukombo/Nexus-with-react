import React, { useState } from "react";
import { Loader, UploadCloud } from "lucide-react";
import { campusStore } from "../../store/campuStore";
import { authStore } from "../../store/authStotre";

export default function Oldalumin() {


  const {
    updateOldProfile,
    isUpdateProfileOld
  } = campusStore();

  const {
    userAuth
  } = authStore();

  const [step, setStep] = useState(1);
   const [image,setImage] = useState(null);
    const [empresas, setEmpresa] = useState("");
     const [about,setAbout] = useState("");
      const [causes, setCouses] = useState("");
       const [experience, setExperience] = useState("");
        const [social1,setSocial1] = useState("");
         const [social2,setSocial2] = useState("");
          const [social3,setSocial3] = useState("");
           const [primario, setPrimario] = useState("");
            const [secundario, setSecundario] = useState("");
             const [superior, setSuperior] = useState("");

            const handleChange = (e) => {
              const { name, value, files } = e.target;
              
              const reader = new FileReader();
              
              reader.readAsDataURL(files[0]);
              reader.onload = function(){
                const base64 = reader.result;
                  setImage(base64);
              }
            };

    

  const resetForm = ()=>{
    setAbout("");
    setEmpresa("");
    setExperience("");
    setSocial1("");
    setSocial2("");
    setSocial3("");
    setImage(null);
    setPrimario("");
    setSecundario("");
    setSuperior("");
  }
 
  const handleSubmit = (e)=>{
    e.preventDefault();


    const dataProfile = {
      about,
      experience,
      causes,
      empresas,
      bannerProfile:image,
      social1,
      social2,
      social3,
      primario,
      secundario,
      superior
    }
    updateOldProfile(dataProfile);
    resetForm();
    console.log(dataProfile)
  }

  //Oldparameters
  const user = userAuth.oldParameters;


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#721011] to-[#8A1A20] p-6 text-white">
          <h2 className="text-2xl font-semibold">Perfil do Ex-Estudante</h2>
          <p className="text-sm opacity-80">Atualize suas informações académicas e profissionais</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
          {/* PROGRESS */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 flex-1 rounded ${step >= 1 ? "bg-[#721011]" : "bg-gray-200"}`} />
            <div className={`h-2 flex-1 rounded ${step >= 2 ? "bg-[#721011]" : "bg-gray-200"}`} />
            <div className={`h-2 flex-1 rounded ${step >= 3 ? "bg-[#721011]" : "bg-gray-200"}`} />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Sobre</label>
                <textarea
                  name="about"
                  value={about || user?.about || ""}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Descreva seu percurso académico..."
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Experiência</label>
                <textarea
                  name="experience"
                  value={experience || user?.experience || ""}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Experiência profissional relevante"
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Empresas</label>
                <input
                  type="text"
                  name="companies"
                  value={empresas || user?.empresas || ""}
                  onChange={(e)=> setEmpresa(e.target.value)}
                  placeholder="Ex: Google, Microsoft..."
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Causas</label>
                <input
                  type="text"
                  name="causes"
                  value={causes || user?.causes || ""}
                  onChange={(e) => setCouses(e.target.value)}
                  placeholder="Educação, Tecnologia, Inclusão..."
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
                />
              </div>

              {/* BANNER UPLOAD */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Banner do Perfil
                <div className="mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#721011] transition cursor-pointer">
                  <UploadCloud className="mb-2" />
                  <span className="text-sm">Clique ou arraste para enviar</span>
                  <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                </label>
              </div>

              {image || user.bannerProfile && (
                <div className="col-span-2 h-[200px] rounded-xl">
                <img src={image || user?.bannerProfile} 
                className="w-full h-full bg-contain bg-no-repeat bg-center rounded-xl"
                />
              </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="md:col-span-2 bg-[#721011] text-white py-3 rounded-xl hover:opacity-90 transition"
              >
                Continuar
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="max-w-xl mx-auto flex flex-col gap-5">

              <h3 className="text-lg font-semibold text-[#721011]">Redes Sociais</h3>

              <input
                type="text"
                name="social1"
                value={social1 || user?.social1 || ""}
                onChange={(e) => setSocial1(e.target.value)}
                placeholder="LinkedIn"
                className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
              />

              <input
                type="text"
                name="social2"
                value={social2 || user?.social2 || ""}
                onChange={(e) => setSocial2(e.target.value)}
                placeholder="GitHub"
                className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
              />

              <input
                type="text"
                name="social3"
                value={social3 || user?.social3 || ""}
                onChange={(e)=> setSocial3(e.target.value)}
                placeholder="Outra rede"
                className="p-3 border rounded-xl focus:ring-2 focus:ring-[#721011] outline-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border py-3 rounded-xl hover:bg-gray-100"
                >
                  Voltar
                </button>

               <button onClick={()=> setStep(3)} className="w-[50%] bg-secundary-color text-white hover:bg-hover btn btn-secundary">Continuar</button>
              </div>

            </div>
          )}

          {step === 3 && (
            <div className="grid grid-flow-row">

              <div className="col-span-1">
                <div className="label">
                  <div className="label-text">Ensino Primario:</div>
                </div>
                <input 
                type="text" 
                className="w-full input input-bordered text-sm" 
                placeholder="Ensino Primario"
                onChange={(e) => setPrimario(e.target.value)}
                value={primario || ""}
                />
              </div>

              <div className="col-span-1">
                <div className="label">
                  <div className="label-text">Ensino Secundario:</div>
                </div>
                <input 
                type="text" 
                className="w-full input input-bordered text-sm" 
                placeholder="Ensino Secundario"
                onChange={(e) => setSecundario(e.target.value)}
                value={secundario || ""}
                />
              </div>

              <div className="col-span-1">
                <div className="label">
                  <div className="label-text">Ensino Superior:</div>
                </div>
                <input 
                type="text" 
                className="w-full input input-bordered text-sm" 
                placeholder="Ensino Superior"
                onChange={(e) => setSuperior(e.target.value)}
                value={superior || ""}
                />
              </div>

              <div className="my-4 flex gap-3">
                <button onClick={()=> setStep(2)} className="btn w-[50%]">Voltar</button>
                <button className="btn w-[50%] bg-secundary-color hover:bg-hover text-white">Publicar</button>
              </div>

                
            </div>
          )}
        </form>
        </div>
      </div>
    </div>
  );
}
