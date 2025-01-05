import React from 'react';
import { CartContext } from '../CartContext';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

export default function CartPage({}) {

//   const location = useLocation();
//   const cart = location.state?.cart || [];
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState([]);


  const handleBuy = () => {
    alert('Proceeding to payment...');
    setCart([]); // Clear the cart after purchase
  };

//   const handleRemoveItem = (id) => {
//     setCart((currentCart) => currentCart.filter((item) => item.id !== id));
//   };

//   const handleRemoveItem = (product) => {
//     setCart((currentCart) => {
//       const existingProduct = currentCart.find((item) => item.id === product.id);
//       if (existingProduct.quantity > 1) {
//         return currentCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
//         );
//       } else {
//         return currentCart.filter((item) => item.id !== product.id);
//       }
//     });
  
//     // Increment product stock in the backend
//     fetch(`http://localhost:3000/products/${product.id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ quantity: product.quantity + 1 }),
//     }).then((response) => {
//       if (!response.ok) {
//         console.error('Failed to increment product quantity');
//       }
//     });
  
//     // Update local state
//     increment(product.id, 1);
//   };

const handleRemoveItem = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct.quantity > 1) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return currentCart.filter((item) => item.id !== product.id);
      }
    });
  
    // Fetch current stock from the backend
    fetch(`http://localhost:3000/products/${product.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((backendProduct) => {
        // Update the backend stock
        const newQuantity = backendProduct.quantity + 1;
        return fetch(`http://localhost:3000/products/${product.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product quantity');
        }
        // Update local state
        increment(product.id, 1);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  
  // Helper function to increment stock locally
  const increment = (id, amount) => {
    setProduct((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + amount } : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

        <div className="navbar bg-teal-200 rounded-b-lg">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Panier</a>
        </div>

        <div className="flex-none gap-2">

        {/* <div className="form-control">
            <input
            type="text"
            placeholder="Rechercher un produit"
            className="input input-bordered w-24 md:w-auto rounded-lg focus:ring-teal-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div> */}

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
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-white shadow-md p-4 rounded-lg">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">Total: ${item.price}</p>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <button
            className="btn btn-success mt-6"
            onClick={handleBuy}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>

  );
}
