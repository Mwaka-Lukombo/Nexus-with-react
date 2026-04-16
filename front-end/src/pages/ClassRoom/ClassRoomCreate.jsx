import React, { useState } from 'react'

export const ClassRoomCreate = () => {
  const [type, setType] = useState("");
   const [bannerClass,setBannerClass] = useState(null);
   const [video, setVideo] = useState(null);
   const [file, setFile] = useState(null);
   const [form, setFormData] = useState({
    nameClass:"",
    course:"",
    year:"",
    description:""
   })


  function readerFile(file,setFunc){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onload = ()=>{
      const base64File = reader.result;
      setFunc(base64File);
    }
  }

   const handleFile = (e)=>{
    const file = e.target.files[0];
    if(file.type === 'image/jpeg' || file.type === 'image/png'
      || file.type === 'image/jpg' || file.type === 'image/webp'
    ){
      //Banner Uploader
      readerFile(file,setBannerClass);
    }else if(file.type === 'application/pdf'){
      //Pdf 
      readerFile(file,setFile);
    }else{
      //Video
      readerFile(file,setVideo);
    }
   }

   const handleSumbit = (e)=>{
     e.preventDefault();

     
     console.log(newClass)
   }
   
  
  return (
    <div className="bg-gray-100 flex items-center justify-center p-2">
  <div className="w-full max-w-3xl  rounded-2xl shadow-lg border border-[#ccc] p-8 space-y-6">

    <h2 className="text-2xl font-bold text-gray-800">Criar Turma</h2>

    {/* Nome da Turma */}
    <form onSubmit={handleSumbit}>
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Nome da Turma</label>
      <input
        type="text"
        placeholder="Ex: Turma A"
        className="input input-bordered w-full"
        onChange={(e) => setFormData((prev) => ({...prev,nameClass:e.target.value}))}
        value={form.nameClass || ""}
      />
    </div>

    {/* Curso */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Curso</label>

      <select onChange={(e) => setFormData((prev) => ({...prev,course:e.target.value}))} className="select select-bordered w-full">
        <option disabled selected>Selecionar curso</option>
        <option value={"Engenharia Informatica"}>Engenharia Informática</option>
        <option value={"Contabilidade"}>Contabilidade</option>
        <option value={"Gestao"}>Gestão</option>
        <option value={"Direito"}>Direito</option>
      </select>
    </div>

    {/* Ano */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Ano</label>
      <input
        type="text"
        placeholder="Ex: 2"
        className="input input-bordered w-full"
        onChange={(e) => setFormData((prev) => ({
          ...prev,
          year:e.target.value
        }))}
        value={form.year || ""}
      />
    </div>

    {/* Upload Material */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Tipo */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Tipo de Upload</label>
        <select onChange={(e) => setType(e.target.value)} className="select select-bordered w-full">
          <option disabled selected>Selecionar tipo</option>
          <option value="video">Vídeo</option>
          <option value="file">Arquivo</option>
        </select>
      </div>

      {/* Arquivo */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Upload</label>
        <input
          type="file"
          accept={type === "video" ? "video/*" : "application/pdf"}
          className="file-input file-input-bordered w-full"
          onChange={handleFile}
        />
      </div>

    </div>

    {/* Descrição */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Descrição</label>
      <textarea
        rows="4"
        placeholder="Descreva a turma..."
        className="textarea textarea-bordered w-full"
        onChange={(e) => setFormData((prev) => ({
          ...prev,
          description:e.target.value
        }))}
      ></textarea>
    </div>

    {/* Banner */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Banner da Turma</label>
      <input
        type="file"
        className="file-input file-input-bordered w-full"
        onChange={handleFile}
      />
    </div>

    {/* Botão */}
    <div className="pt-4">
      <button className="w-full bg-[#721011] hover:bg-[#8A1A20] text-white font-semibold py-3 rounded-xl transition">
        Criar Turma
      </button>
    </div>
    </form>

  </div>
</div>
  )
}
