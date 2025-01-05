// import { useState } from "react";
// import Counter from "./components/Counter";

// function App() {

//   // const name = "Ousoka";
//   // const isLoggedIn = true;
  
//   const [counter, setCounter] = useState(0)
//   const [counter1, setCounter1] = useState(0)

//   // const headingStyle = `text-2xl font-bold ${isLoggedIn ? "text-gray-900" : "text-gray-500"}`;

//   // const frameworks = ["React", "Vue", "Angular"];

//   const increment_by_1 = () => {
//     setCounter(counter + 1);
//     setIsIncrement(true);
//   }

//   const decrement_by_1 = () => {
//     setCounter1(counter1 -1);
//     setIsIncrement(false);
//   };


//     // const [favorites, setFavorites] = useState({});

//     // const handleToggleFavorite = (framework) => {
//     //   setFavorites((prevFavorites) => ({
//     //     ...prevFavorites,
//     //     [framework]: !prevFavorites[framework],
//     //   }));
//     // };

//   return (
//     <>

//     {/* <Counter 
//     count={counter} 
//     name={"Counter A "}
//     handleClick={increment_by_1}
//     action = {'Incrémenter de 1'}
//     style = {'bg-teal-500 hover:bg-teal-900 rounded px-4 py-2 text-white font-bold'}
//     />

//     <p className="mt-2"></p>

//     <Counter 
//       count={counter1} 
//       name={"Counter B "}
//       handleClick={decrement_by_1}
//       action = {'Décrémenter de 1'}
//       style = {'bg-orange-500 hover:bg-orange-900 rounded px-4 py-2 text-white font-bold'}
//     /> */}
//     {/* <Counter count={counter} handleClick={increment_by_1}/> */}

//       {/* <h1 className="text-2xl font-bold">{isLoggedIn ? name : "Anonymous"}</h1> */}
//       {/* <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Counter: {counter}</h1>
//         <button className="bg-teal-500 hover:bg-teal-900 rounded px-4 py-2 text-white font-bold " onClick={increment_by_1}>Ajouter de 1</button>
//         <button className="bg-orange-500 hover:bg-orange-900 rounded px-4 py-2 text-white font-bold" onClick={decrement_by_1}>Décrémenter de 1</button>
//       </div> */}
      

//       {/* <div>
//         {frameworks.map((framework, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <p className="text-lg font-medium">{framework}</p>
//             <button
//               onClick={() => handleToggleFavorite(framework)}
//               className="text-xl"
//             >
//               {favorites[framework] ? (
//                 <span role="img" aria-label="Heart">❤️</span>
//               ) : (
//                 <span role="img" aria-label="Empty Heart">🤍</span>
//               )}
//             </button>
//           </div>
//         ))}
//       </div> */}





//       <div className="navbar bg-base-100">
//         <div className="flex-1">
//           <a className="btn btn-ghost text-xl">Blog</a>
//         </div>
//         <div className="flex-none gap-2">
//           <div className="form-control">
//             <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
//           </div>
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li>
//                 <a className="justify-between">
//                   Profil
//                   {/* <span className="badge">New</span> */}
//                 </a>
//               </li>
//               <li><a>Settings</a></li>
//               <li><a>Logout</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App



// ==========================================================================


import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./CartContext.jsx";
import './index.css'
// import App from './App.jsx'
import Product from './pages/Product.jsx'
import Layout from './layout/Layout.jsx'
import NoPage from './pages/NoPage.jsx'
import Home from './pages/Home.jsx'
import CartPage from "./pages/Cart.jsx";

export default function App() {
  const [cart, setCart] = useState([]);
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route index element={<Home cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="product_create" element={<Product />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );