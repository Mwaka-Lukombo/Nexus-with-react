import React, { useEffect, useState } from "react";
import { forumStore } from "../../store/forumStore";
import { LoaderIcon } from "react-hot-toast";
import {
    authStore
} from '../../store/authStotre';

export const CreateForumForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    course: "",
    topic: "",
    year: "",
    teacher_id: ""
  });

  const {
    createForum,
    isLoading,
    forums,
    getFoum
  } = forumStore();

  const {
   userAuth
  } = authStore();

   const initialState = {
    title: "",
    description: "",
    course: "",
    topic: "",
    year: "",
    teacher_id: ""
  };

  useEffect(()=>{
   getFoum();
  },[getFoum,userAuth])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createForum(form);
    setForm(initialState);
  };


const myForuns = Array.isArray(forums)
  ? forums.filter((curr) => curr?.teacher_id === userAuth?._id)
  : [];

  return (
    <>
    <div className="max-w-[800px] w-[95%] mx-auto my-10 p-6 rounded-2xl shadow-xl border border-[#ccc] ">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3">
        Create Forum
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Title */}
        <div className="form-control">
          <label className="label-text mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Forum title..."
            className="input input-bordered"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label-text mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe the forum..."
            className="textarea textarea-bordered resize-none"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Course (SELECT) */}
          <div className="form-control">
            <label className="label-text mb-1">Course</label>
            <select
              name="course"
              className="select select-bordered"
              value={form.course}
              onChange={handleChange}
            >
              <option value="">Select course</option>
              <option value="Engenharia Informatica">Engenharia Informatica</option>
              <option value="Direito">Direito</option>
              <option value="Contabilidade">Contabilidade</option>
              <option value="Analises Clinicas">Analises Clinicas</option>
            </select>
          </div>

          {/* Topic (INPUT) */}
          <div className="form-control">
            <label className="label-text mb-1">Topic</label>
            <input
              type="text"
              name="topic"
              placeholder="Ex: Backend, UI/UX..."
              className="input input-bordered"
              value={form.topic}
              onChange={handleChange}
            />
          </div>

          {/* Year (INPUT) */}
          <div className="form-control">
            <label className="label-text mb-1">Year</label>
            <input
              type="number"
              name="year"
              placeholder="Ex: 1, 2, 3..."
              className="input input-bordered"
              value={form.year}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Submit */}
        <div className="mt-4">
          <button disabled={isLoading} className="btn bg-secundary-color text-white hover:bg-hover w-full md:w-[200px]">
            {!isLoading ? "Create Forum" : <div className="flex items-center justify-center">
            <LoaderIcon className="size-5 animate-spin" />
            </div>}
          </button>
        </div>

      </form>
    </div>

    <div className="my-4  w-[95%] mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        
        {myForuns?.map((forum) => (
            <>
              <div className="p-3 col-span-1 h-[150px] shadow-xl border border-[#ccc] rounded-xl">
                <h3 className="text-center text-xl leading-normal font-bold">{forum?.topic} - {forum?.year} ª</h3>
                <p className="text-sm font-normal leading-normal text-justify">{forum?.description.slice(0,300)}</p>
              </div>
            </>
        ))}
      </div>
    </div>
    </>
  );
};