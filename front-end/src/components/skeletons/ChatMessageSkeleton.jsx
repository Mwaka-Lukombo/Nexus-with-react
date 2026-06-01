import React from "react";

export const ChatMessagesSkeleton = () => {
  return (
    <div className="w-[80%] mx-auto my-[50px] h-[450px] shadow-xl border border-[#ccc] rounded-2xl">
      <div className="flex">

        {/* Sidebar Skeleton */}
        <div className="w-[30%] min-h-[450px] border-r border-[#ccc] overflow-y-auto">
          <div className="flex items-center px-3 w-full border-b border-[#ccc] h-[74px]">
            <div className="h-5 w-24  rounded" />
          </div>

          <div className="w-full h-[306px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full" />
                <div>
                  <div className="h-4 w-24  rounded mb-2" />
                  <div className="h-3 w-32  rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-[70%]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-3 w-full h-[74px] border-b border-[#ccc]">
            <div className="flex items-center gap-3">
              
              <div className="w-12 h-12 rounded-full bg-gray/80 animate-pulse" />

              <div>
                <div className="h-4 w-28 animate-pulse bg-gray/80 rounded mb-2" />
                <div className="h-3 w-16 animate-pulse bg-gray/80 rounded" />
              </div>
            </div>

            <div className="w-[50px] h-[50px] rounded-full bg-gray/80 animate-pulse" />
          </div>

          {/* Messages */}
          <div className="w-full h-[315px] p-3 relative">
            {Array.from({ length: 6 }).map((_, i) => {
              const isMe = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full bg-gray/80 animate-pulse" />
                  </div>

                  <div className="chat-bubble bg-gray/80 animate-pulse text-transparent">
                    <div className="h-4 w-32" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="px-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[40px]  animate-pulse rounded" />
              <div className="w-[40px] h-[40px]  animate-pulse rounded" />
              <div className="w-[40px] h-[40px]  animate-pulse rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};