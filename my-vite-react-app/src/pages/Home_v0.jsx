import React, { useEffect, useState } from 'react';
import { Component } from '../components/Blog_Card';

export default function Home() {
  // const blogs = [
  //   {
  //     blog_image_src: "src/assets/images/uam.jpg",
  //     author: "Albert Bakhoum",
  //     author_image: "src/assets/images/asb.jpeg",
  //     timestamp: "02/01/2025",
  //     blog_title: 'First Blog Post',
  //     blog_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis, velit sed bibendum bibendum, purus velit sagittis velit, et consectetur nunc nisi euismod nisi.',
  //   },
  //   {
  //     blog_image_src: "src/assets/images/crous.jpg",
  //     author: "Souleymane Diallo",
  //     author_image: "src/assets/images/sdley.jpeg",
  //     timestamp: "01/01/2025",
  //     blog_title: 'Second Blog Post',
  //     blog_description: 'Donec id ipsum non urna consectetur gravida. Duis nec ligula a ex tincidunt euismod. Nullam vel urna non velit pellentesque bibendum.',
  //   },
  //   {
  //     blog_image_src: "src/assets/images/khouma.jpg",
  //     author: "Pape Moussa Diop",
  //     author_image: "src/assets/images/joob.jpeg",
  //     timestamp: "31/12/2024",
  //     blog_title: 'Third Blog Post',
  //     blog_description: 'Quisque id ex at nunc viverra tempor. Duis quis velit vel ex bibendum facilisis non et lectus.',
  //   },
  // ];


//   {
//     "posts": [
//         {
//           "id": 1,
//           "blog_image_src": "src/assets/images/uam.jpg",
//           "author": "Albert Bakhoum",
//           "author_image": "src/assets/images/asb.jpeg",
//           "timestamp": "02/01/2025",
//           "blog_title": "First Blog Post",
//           "blog_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis, velit sed bibendum bibendum, purus velit sagittis velit, et consectetur nunc nisi euismod nisi."
//         },
//         {
//           "id": 2,
//           "blog_image_src": "src/assets/images/crous.jpg",
//           "author": "Souleymane Diallo",
//           "author_image": "src/assets/images/sdley.jpeg",
//           "timestamp": "01/01/2025",
//           "blog_title": "Second Blog Post",
//           "blog_description": "Donec id ipsum non urna consectetur gravida. Duis nec ligula a ex tincidunt euismod. Nullam vel urna non velit pellentesque bibendum."
//         },
//         {
//           "id": 3,
//           "blog_image_src": "src/assets/images/khouma.jpg",
//           "author": "Pape Moussa Diop",
//           "author_image": "src/assets/images/joob.jpeg",
//           "timestamp": "31/12/2024",
//           "blog_title": "Third Blog Post",
//           "blog_description": "Quisque id ex at nunc viverra tempor. Duis quis velit vel ex bibendum facilisis non et lectus."
//         }
//       ]
// }

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json(); 
        setPosts(data); 
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err); 
      }
    };
  
    fetchPosts(); 
  }, []); 
  
  const handleCommentPosts = (id) => {
    // console.log(`commenting post with id ${id}`);
     fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => setPosts(posts.filter(post => post.id!== id)))
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <div>
      <div className="navbar bg-teal-100 rounded-b-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Home</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto rounded-lg  focus:ring-teal-500" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="src/assets/images/asb.jpeg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profil
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              {/* Uncomment below if needed */}
              {/* <li><a>Settings</a></li>
              <li><a>Logout</a></li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      {posts.length === 0 && !error && <p className='text-2xl text-center mt-10'>Loading...</p>}
      {error && <p className='text-2xl text-center text-red-500'>Fetch errors</p>}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((blog, index) => (
          <Component
            key={index}
            id={blog.id}
            blog_image_src={blog.blog_image_src}
            author={blog.author}
            author_image={blog.author_image}
            timestamp={blog.timestamp}
            blog_title={blog.blog_title}
            blog_description={blog.blog_description}
            // onComment={handleCommentPosts(blog.id)}
            onComment={() => handleCommentPosts(blog.id)}

          />
        ))}
      </div>
    </div>
  );
}
