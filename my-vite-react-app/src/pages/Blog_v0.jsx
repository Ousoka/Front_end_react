import React, {useState} from 'react'


export default function Blog() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  

  const handleSubmit = (e) => {
      e.preventDefault();

      // console.log('Title:', title);
      // console.log('Content:', content);
      // console.log('Image:', image);
  };

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setImage(file);
  };


  return (
    <>
      
      <div className="navbar bg-teal-200 rounded-b-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Blog</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto rounded-lg  focus:ring-teal-500" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="src/assets/images/asb.jpeg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profil
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              {/* <li><a>Settings</a></li>
              <li><a>Logout</a></li> */}
            </ul>
          </div>
        </div>
      </div>

        <div className="max-w-3xl mx-auto bg-teal-100 p-6 rounded-md shadow-md mt-5">
            <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter article title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                        Specifications
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer les specifications du produits"
                        rows="6"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                        Url de l'image du produit
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer l'url de l'image du produit"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                        Quantite 
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer la quanité"
                        required
                    />
                </div>

                <div>
                <label
                        htmlFor="image"
                        className="block font-medium text-gray-700 mb-2"
                    >
                        Upload Image
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="image"
                                className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 text-sm mb-5"
                            >
                                Choose Image
                            </label>
                        </div>
                        {image && (
                            <p className="text-sm text-gray-600">{image.name}</p>
                        )}
                    </div>
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="mt-4 max-h-40 w-full object-contain rounded-md border"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                    Create Article
                </button>
            </form>
        </div>

    </>
  )
}
