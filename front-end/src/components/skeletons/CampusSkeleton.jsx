import React from "react";

export const CampusSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-[rgb(114,16,17)] rounded-2xl shadow-md p-5 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse bg-[#ccc] mb-3" />

          {/* Nome */}
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse bg-[#ccc] mb-2" />

          {/* Curso */}
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse bg-[#ccc] mb-4" />

          {/* Botão */}
          <div className="h-8 w-[70%] bg-gray-300 rounded-xl animate-pulse bg-[#ccc]" />
        </div>
      ))}
    </div>
  );
};