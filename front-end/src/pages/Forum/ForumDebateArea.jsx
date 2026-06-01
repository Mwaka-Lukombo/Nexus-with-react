import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ForumPostsView } from "../../components/common/ForumPostsView";

const mockForums = [
  {
    id: 1,
    title: "Discussão de Backend",
    course: "Engenharia Informatica",
    topic: "APIs",
    year: 2,
    posts: 12
  },
  {
    id: 2,
    title: "Direito Penal Debate",
    course: "Direito",
    topic: "Crime",
    year: 3,
    posts: 5
  }
];

export const ForumDebateArea = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activeForum, setActiveForum] = useState(null);

  const filteredForums = selectedCourse
    ? mockForums.filter((f) => f.course === selectedCourse)
    : mockForums;

  return (
    <div className="max-w-[1000px] w-[95%] mx-auto my-10">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4 border-b pb-3">
        Forum Discussions
      </h1>

      {/* FILTER BAR */}
      <div className="flex items-center justify-between mb-6">

        <select
          className="select select-bordered w-full md:w-[300px]"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Engenharia Informatica">Engenharia Informatica</option>
          <option value="Direito">Direito</option>
          <option value="Contabilidade">Contabilidade</option>
          <option value="Analises Clinicas">Analises Clinicas</option>
        </select>

      </div>

      {/* FORUM LIST */}
      {!activeForum && (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredForums.map((forum) => (
            <div
              key={forum.id}
              className="p-4 border rounded-2xl shadow-xl bg-white hover:shadow-2xl transition"
            >
              <h2 className="text-lg font-bold">{forum.title}</h2>

              <p className="text-sm text-gray-500">
                {forum.course} • {forum.year}º ano
              </p>

              <p className="text-sm mt-2">
                Topic: {forum.topic}
              </p>

              <p className="text-xs mt-1 text-gray-400">
                {forum.posts} posts
              </p>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setActiveForum(forum)}
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                  Enter
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INSIDE FORUM (POST AREA) */}
      {activeForum && (
        <ForumPostsView
          forum={activeForum}
          onBack={() => setActiveForum(null)}
        />
      )}
    </div>
  );
};
