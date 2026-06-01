import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    user: "João Pedro",
    course: "Engenharia Informatica",
    year: 2,
    text: "Como funciona autenticação JWT?",
    comments: []
  }
];

export const ForumPostsView = ({ forum, onBack }) => {
  const [posts, setPosts] = useState(mockPosts);
  const [openReply, setOpenReply] = useState(null);
  const [comment, setComment] = useState("");

  const addComment = (postId) => {
    if (!comment.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, { text: comment }]
            }
          : p
      )
    );

    setComment("");
    setOpenReply(null);
  };

  return (
    <div className="mt-6">

      {/* HEADER FORUM */}
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="text-xl font-bold">
          {forum.title}
        </h2>

        <button
          onClick={onBack}
          className="text-sm text-blue-500 hover:underline"
        >
          Back
        </button>
      </div>

      {/* POSTS */}
      <div className="space-y-4">

        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-2xl shadow bg-white"
          >

            {/* USER */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />

              <div>
                <h3 className="font-bold">{post.user}</h3>
                <p className="text-xs text-gray-500">
                  {post.course} • {post.year}º ano
                </p>
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-3 text-sm">
              {post.text}
            </p>

            {/* ACTION */}
            <div className="flex justify-end mt-3">
              <button
                onClick={() =>
                  setOpenReply(openReply === post.id ? null : post.id)
                }
                className="flex items-center gap-1 text-blue-500"
              >
                Reply
                <ChevronDown className="size-4" />
              </button>
            </div>

            {/* COMMENTS */}
            {post.comments.map((c, i) => (
              <div
                key={i}
                className="mt-2 ml-4 text-sm bg-gray-50 p-2 rounded"
              >
                {c.text}
              </div>
            ))}

            {/* COMMENT FORM */}
            {openReply === post.id && (
              <div className="mt-3">
                <label className="text-sm font-medium">Post</label>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Write a comment 😊"
                />

                <button
                  onClick={() => addComment(post.id)}
                  className="btn bg-secundary-color text-white mt-2"
                >
                  Post
                </button>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};