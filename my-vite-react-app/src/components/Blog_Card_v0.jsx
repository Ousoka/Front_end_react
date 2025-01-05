import React from 'react';

export function Component({ id, blog_image_src, blog_title, blog_description, author_image, author, timestamp, onComment }) {

  // const handleCommentPosts = (id) => {
  //   console.log(`commenting post with id ${id}`);
  // };
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="flex items-center justify-center bg-gray-100 h-64">
        <img
          src={blog_image_src}
          alt={blog_title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">{blog_title}</h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">{blog_description}</p>

        {/* Author Info */}
        <div className="flex items-center mt-4">
          <img
            src={author_image}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{author}</p>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
          <img
            src="src/assets/images/like.png"
            className="w-6 h-6 rounded-full object-cover"
          />
            Like
          </button>
          <button onClick={()=>{onComment(id)}}
            className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
          <img
            src="src/assets/images/chat.png"
            className="w-6 h-6 rounded-full object-cover"
          />
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
