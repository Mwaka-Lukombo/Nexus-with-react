import React from "react";

export const AlumniProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-10 animate-pulse">

      {/* BANNER */}
      <div className="relative w-full h-[220px] md:h-[300px] rounded-2xl bg-gray/80 skeleton">
        
        {/* PROFILE IMAGE */}
        <div className="absolute -bottom-12 left-6 md:left-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray/80 border-4 border-white" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto mt-16 px-4  space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center  md:justify-between gap-4">

          <div className="space-y-2">
            <div className="h-6 w-40 bg-gray/80 rounded" />
            <div className="h-4 w-28 bg-gray/80 rounded" />

            <div className="flex gap-3 mt-2">
              <div className="h-4 w-16 bg-gray/80 rounded" />
              <div className="h-4 w-16 bg-gray/80 rounded" />
              <div className="h-4 w-16 bg-gray/80 rounded" />
            </div>
          </div>

          <div className="h-10 w-36 bg-gray-300 rounded-xl" />
        </div>

        {/* ABOUT */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow space-y-3">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray/80 rounded" />
          <div className="h-4 w-5/6 bg-gray/80 rounded" />
          <div className="h-4 w-2/3 bg-gray/80 rounded" />
        </div>

        {/* EXPERIENCE */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-40 bg-gray/80 rounded" />

          {[1, 2].map((_, i) => (
            <div key={i} className="space-y-2 border-l-2  pl-4">
              <div className="h-4 w-32 bg-gray/80 rounded" />
              <div className="h-3 w-24 bg-gray/80 rounded" />
              <div className="h-3 w-20 bg-gray/80 rounded" />
            </div>
          ))}
        </div>

        {/* ACADEMIC LIFE */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="h-5 w-40 bg-gray/80 rounded" />

          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-28 bg-gray/80 rounded" />
                <div className="h-4 w-40 bg-gray/80 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* CAUSES */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
          <div className="h-5 w-32 bg-gray-300 rounded" />

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray/80 rounded-full" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};