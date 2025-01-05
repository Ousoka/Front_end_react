import React, { useEffect, useState, useContext } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 999 });
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [search, setSearch] = useState(''); 
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceFilter.min &&
      product.price <= priceFilter.max &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    // setCart((currentCart) => {
    //   const existingProduct = currentCart.find((item) => item.id === product.id);
    //   if (existingProduct) {
    //     // Update quantity if product already in cart
    //     return currentCart.map((item) =>
    //       item.id === product.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );
    //   } else {
    //     // Add new product to cart
    //     return [...currentCart, { ...product, quantity: 1 }];
    //   }
    // });

    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });

    // Decrement product stock in the backend
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: product.quantity - 1 }),
    }).then((response) => {
      if (!response.ok) {
        console.error('Failed to decrement product quantity');
      }
    });

    // Decrement product stock
    decrement(product.id, 1);
  };



  // const decrement = (id, buyNumber) => {
  //   setProducts((currentProducts) =>
  //     currentProducts.map((product) =>
  //       product.id === id && product.quantity > 0
  //         ? {
  //             ...product,
  //             quantity: product.quantity >= buyNumber ? product.quantity - buyNumber : 0,
  //           }
  //         : product
  //     )
  //   );
  // };

  // const decrement = (id, buyNumber) => {
  //   setProducts((currentProducts) =>
  //     currentProducts.map((product) =>
  //       product.id === id && product.quantity > 0
  //         ? {
  //             ...product,
  //             quantity: product.quantity >= buyNumber ? product.quantity - buyNumber : 0,
  //           }
  //         : product
  //     )
  //   );
  
  //   setCart((currentCart) => {
  //     const existingProduct = currentCart.find((item) => item.id === id);
  //     if (existingProduct) {
  //       return currentCart.map((item) =>
  //         item.id === id
  //           ? {
  //               ...item,
  //               quantity: item.quantity + buyNumber,
  //               price: (item.quantity + buyNumber) * item.unitPrice,
  //             }
  //           : item
  //       );
  //     } else {
  //       const product = products.find((product) => product.id === id);
  //       return [
  //         ...currentCart,
  //         { ...product, quantity: buyNumber, unitPrice: product.price, price: buyNumber * product.price },
  //       ];
  //     }
  //   });
  // };

  const decrement = (id, buyNumber) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? {
              ...product,
              quantity: product.quantity >= buyNumber ? product.quantity - buyNumber : 0,
            }
          : product
      )
    );
  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setProducts(products.filter((product) => product.id!== id));
    });
  };

  // const handleEdit = (id) => {
  //   // navigate(`/product_create/${id}`);
  //   navigate('/product_create', { state: { id } });
  // };

  const handleEdit = (id) => {
    navigate('/product_create', { state: { productId: id } });  // Pass productId in the state
  };
  

  //selectionner le produit favori
  const toggleFavorite = (id) => {
    setFavoriteProducts((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favId) => favId !== id)
        : [...currentFavorites, id]
    );
  };

  const displayMode = "recent"; // ou "chers"

  const displayedProducts =
    displayMode === "recent"
      ? [...filteredProducts].sort((a, b) => b.id - a.id).slice(0, 3) // les 3 plus récents
      : [...filteredProducts].sort((a, b) => b.price - a.price).slice(0, 3); // les 3 les plus chers
  

  // recup products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="navbar bg-teal-200 rounded-b-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Acceuil</a>
        </div>

        <div className="flex-none gap-2">


        <div className="form-control">
          <input
            type="text"
            placeholder="Rechercher un produit"
            className="input input-bordered w-24 md:w-auto rounded-lg focus:ring-teal-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="dropdown dropdown-end">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => navigate('/cart', { state: { cart } })}
            >
              🛒 <span className="badge">{cart.length}</span>
            </button>
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="container mx-auto py-6 px-4">

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Filtrer les produits selon leur prix</h2>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <span className="text-gray-600">Prix min:</span>
              <input
                type="number"
                className="input input-bordered rounded-lg h-7 w-16 focus:ring-teal-500"
                value={priceFilter.min}
                onChange={(e) => setPriceFilter({ ...priceFilter, min: Number(e.target.value) })}
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="text-gray-600">Prix max:</span>
              <input
                type="number"
                className="input input-bordered rounded-lg h-7 w-16 focus:ring-teal-500"
                value={priceFilter.max}
                onChange={(e) => setPriceFilter({ ...priceFilter, max: Number(e.target.value) })}
              />
            </label>
          </div>
        </div>


        {products.length === 0 && !error && (
          <p className="text-2xl text-center mt-10">Loading...</p>
        )}
        {error && <p className="text-2xl text-center text-red-500">Fetch errors</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              content={product.content}
              isFavorite={favoriteProducts.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              // onBuy={() => decrement(product.id, 1)}
              onBuy={() => addToCart(product)}
              onDelete={() => handleDelete(product.id)}
              onEdit={() => handleEdit(product.id)}
              // onBuyTwo={() => decrement(product.id, 2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
