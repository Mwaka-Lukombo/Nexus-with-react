import { 
    Bold, 
    Image, 
    Italic, 
    Pencil, 
    Trash2, 
    Underline, 
    UploadCloud, 
    Video 

} from 'lucide-react'
import {
    React,
    useEffect,
    useState
} from 'react'

import {
    MyPlayer
} from '../../components/lib/MyPlayer';
import { aluminStore } from '../../store/aluminStore';


export const CreateAlumin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const maxChars = 500;

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  const {
    createNotice,
    getMyNotices,
    myNotices,
    deleteNotice
  } = aluminStore();


  useEffect(()=>{
    getMyNotices(1);
  },[getMyNotices])

  const resetForm = ()=>{
    setTitle("");
    setContent("");
    setImage("");
    setVideo("");
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

     const newNotice = {
        title,
        text:content,
        img:image,
        video
     }
     createNotice(newNotice);
     resetForm();
  }

  const handleFile = (file,setMethod)=>{
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = ()=>{
        let base64 = reader.result;
        setMethod(base64)
    }
  }




  


 
  return (
    <div>
      <div className="w-full max-w-[700px] mx-auto border border-[#ccc] rounded-2xl shadow-xl p-6">
        <h1 className="text-xl font-bold text-[#721011] mb-5 text-center">
          Criar Publicação
        </h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da publicação..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Editor */}
        <div className="mb-5">
          <div className="flex gap-2 mb-2 border border-[#ccc] rounded-xl p-2 bg-gray-50">
            <button onClick={() => formatText("bold")} type="button" className="p-2 hover:bg-gray-200 rounded-lg">
              <Bold size={16} />
            </button>
            <button onClick={() => formatText("italic")} type="button" className="p-2 hover:bg-gray-200 rounded-lg">
              <Italic size={16} />
            </button>
            <button onClick={() => formatText("underline")} type="button" className="p-2 hover:bg-gray-200 rounded-lg">
              <Underline size={16} />
            </button>
          </div>

          <textarea
            contentEditable
            onInput={(e) => setContent(e.currentTarget.innerText)}
            className="w-full min-h-[160px] max-h-[260px] overflow-y-auto textarea textarea-bordered resize"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/{maxChars}
          </div>
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="flex flex-col items-center justify-center border border-[#ccc] border-dashed rounded-xl p-5 cursor-pointer hover:bg-gray-50 transition">
            <Image className="text-[#721011] mb-2" />
            <span className="text-sm text-gray-600">Upload de Imagem</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e)=> handleFile(e.target.files[0],setImage)}
            />
          </label>
        </div>

        {/* Upload Video */}
        <div className="mb-5">
          <label className="flex flex-col items-center justify-center border border-[#ccc] border-dashed rounded-xl p-5 cursor-pointer hover:bg-gray-50 transition">
            <Video className="text-[#721011] mb-2" />
            <span className="text-sm text-gray-600">Upload de Vídeo</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e)=> handleFile(e.target.files[0],setVideo)}
            />
          </label>
        </div>

        {/* Preview */}
        <div className="mb-5 space-y-3">
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-full h-44 object-cover rounded-xl"
            />
          )}

          {video && (
            <div className='h-[400px]'>
            <MyPlayer
              src={video}
              controls
              className="w-full rounded-xl"
            />
            </div>
          )}
        </div>

        {/* Submit */}
        <button className="w-full bg-[#721011] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
          <UploadCloud size={18} />
          Publicar
        </button>
        </form>
      </div>    

      <div>

           {/* LIST */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-[#721011]">
            Minhas Notícias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(myNotices.myNotices) && myNotices.myNotices.map((n) => (
              <div key={n.id} className=" rounded-2xl shadow-xl border border-[#ccc] p-4 flex flex-col gap-2">
                <h3 className="font-bold text-gray-800">{n.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{n.text.slice(0,100)}...</p>

                {n.img && (
                  <div className='w-full h-[300px] border border-[#ccc] rounded-xl'>
                    <img src={n.img} className="w-full h-full bg-center bg-no-repeat  object-cover rounded-xl" />
                  </div>
                )}

                {n.video && (
                    <div className='w-full h-[300px]'>
                  <MyPlayer src={n.video} controls className="w-full rounded-xl" />
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={()=> {
                        setTitle(n.title);
                        setContent(n.text);
                        setImage(n.img);
                        setVideo(n.video)
                        window.scrollTo({behavior:'smooth',top:0})
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => {
                        if(!confirm("Your need delete this notice? ")) return;
                        deleteNotice(n._id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* {pagination} */}
            
            <div className='col-span-2 flex items-center justify-center'>
              <div className="join">
                
                {[...Array(myNotices?.totalPages)].map((_,index)=> {
                  const currentPage = Number(index+1)
                  return(
                    <input 
                    className="join-item btn btn-square" 
                    type="radio" 
                    name="options" 
                    aria-label={currentPage} 
                    onClick={()=> getMyNotices(currentPage)}
                    checked={myNotices?.currentPage === currentPage || currentPage == 1}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  )
}
