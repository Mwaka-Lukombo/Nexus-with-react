import React, { useEffect } from "react";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { campusStore } from "../../store/campuStore";
import { AlumniProfileSkeleton } from "../../components/skeletons/AlumniProfileSkeleton";

export const ProfileAlumin = ({ student }) => {
  const data = student || {
    
    experience: [
      { company: "Google", role: "Frontend Dev", period: "2022 - Atual" },
      { company: "Startup X", role: "Intern", period: "2021 - 2022" }
    ],
    academics: {
      primary: "Escola Primária X",
      secondary: "Escola Secundária Y",
      higher: "Universidade Z",
      masters: "Mestrado em Engenharia de Software"
    },
    social1: "https://linkedin.com",
    social2: "https://github.com",
    social3: "https://twitter.com",
  };

  const {
    getSingleUser,
    isSingle,
    singleStudent
  } = campusStore();

  const {id} = useParams();

  useEffect(()=>{
    getSingleUser(id);
  },[getSingleUser,id]);

  if(isSingle){
    return <AlumniProfileSkeleton />
  }

  const handleDownload = () => {
    window.print();
  };


  const parameters = singleStudent.oldParameters;



  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* BANNER */}
      <div className="relative w-full h-[220px] md:h-[300px] rounded-2xl">
        <img src={parameters?.bannerProfile} className="w-full h-full object-cover rounded-2xl" />

        <div className="absolute -bottom-12 left-6 md:left-10">
          <img
            src={singleStudent?.profileImg || "/avatar.png"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto mt-16 px-4">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#721011]">
              {singleStudent?.fullname}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {parameters?.followers?.length} seguidores
            </p>

            <div className="flex gap-3 mt-2">
              <a href={parameters?.social1} target="_blank" className="text-sm text-blue-600 hover:underline">LinkedIn</a>
              <a href={parameters?.social2} target="_blank" className="text-sm text-gray-800 hover:underline">GitHub</a>
              <a href={parameters?.social3} target="_blank" className="text-sm text-sky-500 hover:underline">Outro</a>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#721011] text-white px-4 py-2 rounded-xl hover:opacity-90"
          >
            <Download size={16} />
            Baixar PDF
          </button>
        </div>

        {/* ABOUT */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#721011] mb-2">Sobre</h2>
          <p className="text-gray-600 leading-relaxed">
            {parameters?.about}
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#721011] mb-4">Experiência</h2>

          <div className="flex flex-col gap-4">
            {/* {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-[#721011] pl-4">
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <span className="text-xs text-gray-400">{exp.period}</span>
              </div>
            ))} */}

            <p>{parameters?.experience}</p>
          </div>
        </div>

        {/* ACADEMIC LIFE */}
        {/* To Do */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#721011] mb-4">Vida Académica</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Ensino Primário</p>
              <h4 className="font-medium">{data.academics.primary}</h4>
            </div>

            <div>
              <p className="text-sm text-gray-500">Ensino Secundário</p>
              <h4 className="font-medium">{data.academics.secondary}</h4>
            </div>

            <div>
              <p className="text-sm text-gray-500">Ensino Superior</p>
              <h4 className="font-medium">{data.academics.higher}</h4>
            </div>

            {data.academics.masters && (
              <div>
                <p className="text-sm text-gray-500">Mestrado</p>
                <h4 className="font-medium">{data.academics.masters}</h4>
              </div>
            )}
          </div>
        </div>

        {/* CAUSES */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#721011] mb-2">Causas</h2>

          <div className="flex flex-wrap gap-2">
            
              <span
                
                className="px-3 py-1 bg-[#721011]/10 text-[#721011] rounded-full text-sm"
              >
                {parameters?.causes}
              </span>
          </div>
        </div>

      </div>
    </div>
  );
}
