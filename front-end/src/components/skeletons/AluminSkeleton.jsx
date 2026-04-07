import React from "react";

export const AluminSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="my-4 w-[100%] md:w-[50%] h-[1000px] rounded-xl mx-auto"
        >
          {/* Header */}
          <div className="p-2 flex items-center gap-3 h-[7%]">
            
            {/* Avatar */}
            <div className="w-[50px] h-[50px] rounded-full border border-[#ccc] bg-gray/80 skeleton" />

            {/* Nome + email */}
            <div>
              <div className="h-4 w-28 bg-gray/80 animate-pulse rounded mb-2" />
              <div className="h-3 w-36 bg-gray/80 animate-pulse rounded" />
            </div>

            {/* Time */}
            <div>
              <div className="h-3 w-12 bg-gray/80 animate-pulse rounded" />
              <span className="text-transparent">a</span>
            </div>
          </div>

          {/* Media (imagem/video) */}
          <div className="w-full h-[80%] border border-[#ccc] bg-gray/80 skeleton" />

          {/* Actions */}
          <div className="w-full h-[5%] flex items-center justify-between gap-3 px-3">
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-white/80 animate-pulse rounded" />
                <div className="w-6 h-3 bg-white/80 animate-pulse rounded" />
              </div>

              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-white/80 animate-pulse rounded" />
                <div className="w-6 h-3 bg-white/80 animate-pulse rounded" />
              </div>
            </div>

            <div className="w-5 h-5 bg-white/80 animate-pulse rounded" />
          </div>

          {/* Texto */}
          <div className="w-full h-[7%]">
            <div className="h-4 w-[80%] bg-white/80 animate-pulse rounded mb-2" />
            <div className="h-3 w-[40%] bg-white/80 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </>
  );
};