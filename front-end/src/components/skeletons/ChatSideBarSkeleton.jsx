import React from "react";

export const ChatSidebarSkeleton = ({ count = 6 }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center px-3 w-full border-b border-[#ccc] h-[74px]">
        <div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Lista */}
      <div className="w-full h-[306px] overflow-y-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="px-5 py-3 flex items-center gap-3">
            
            {/* Avatar */}
            <div className="w-[50px] h-[50px] rounded-full bg-gray-300 animate-pulse" />

            {/* Textos */}
            <div className="flex flex-col gap-2">
              <div className="h-[50px] w-[50px] rounded-full bg-gray-300  animate-pulse bg-black/80" />
              <div className="h-[10px] w-32 bg-gray-200 rounded animate-pulse bg-black/80" />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};