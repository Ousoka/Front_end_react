import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Product() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const [updated_title, setTitle1] = useState('');
  const [updated_content, setContent1] = useState('');
  const [updated_quantity, setQuantity1] = useState(0);
  const [updated_image, setImage1] = useState("");
  const [updated_price, setPrice1] = useState(0);

  const navigate = useNavigate();   
  const location = useLocation();

  //retrive the product id from another page sent using navigate(`/product_create/${id}`);
  // const { productId } = location.state || {};
  const { productId } = location.state || {};

  console.log(productId);


  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const product = await response.json();
        setTitle1(product.title);
        setContent1(product.content.join("\n"));
        setQuantity1(product.quantity);
        setImage1(product.image);
        setPrice1(product.price);
      }
    };
    fetchProduct();
  }, [productId]);
  

  const updatedProduct = {
    id: `${productId}`,
    title : updated_title,
    content: updated_content,
    quantity: parseInt(updated_quantity),
    image : updated_image,
    price: parseFloat(updated_price),
  };

  console.log(updatedProduct);

  const handleUpdatedSubmit = async (e) => {
    e.preventDefault();

    // Send the updated product to the JSON server
    await fetch(`http://localhost:3000/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    setTitle('');
    setContent('');
    setQuantity(0);
    setImage('');
    setPrice(0);
  
    alert("Product updated successfully!");

    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:3000/products"); 
    const products = await response.json();
  
    // logique pour avoir des ids autoincrement
    // const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const nextId = products.reduce((maxId, p) => Math.max(maxId, p.id), 0) + 1;

    const newProduct = {
      id: `${nextId}`,
      title,
      content: content.split("\n"),
      quantity: parseInt(quantity),
      image,
      price: parseFloat(price),
    };
  
    // Send the new product to the JSON server
    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  
    setTitle('');
    setContent('');
    setQuantity(0);
    setImage('');
    setPrice(0);
  
    alert("Product created successfully!");

    navigate('/');
  };
  

  return (
    <>
      
      <div className="navbar bg-teal-200 rounded-b-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Produits</a>
        </div>
        <div className="flex-none gap-2">
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {productId ? 
      // Modification de produit
        <div className="max-w-3xl mx-auto bg-teal-100 p-6 rounded-md shadow-md mt-5">
          <h1 className="text-2xl font-bold mb-4">Créer un nouveau produit</h1>
            <form onSubmit={handleUpdatedSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={updated_title}
                        onChange={(e) => setTitle1(e.target.value)}
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
                        value={updated_content}
                        onChange={(e) => setContent1(e.target.value)}
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
                        value={updated_image}
                        onChange={(e) => setImage1(e.target.value)}
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
                        value={updated_quantity}
                        onChange={(e) => setQuantity1(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer la quanité"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                        Prix 
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={updated_price}
                        onChange={(e) => setPrice1(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer le prix de l'article"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                    Modify Article
                </button>
            </form>
        </div>
      :
      // Ajout de produit
        <div className="max-w-3xl mx-auto bg-teal-100 p-6 rounded-md shadow-md mt-5">
            <h1 className="text-2xl font-bold mb-4">Créer un nouveau produit</h1>
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

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                        Prix 
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Entrer le prix de l'article"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                    Create Article
                </button>
            </form>
        </div>
      }

    </>
  )
}
