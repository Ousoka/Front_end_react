import { useState } from "react";

function App() {

  // const name = "Ousoka";
  // const isLoggedIn = true;
  
  const [counter, setCounter] = useState(0)

  // const headingStyle = `text-2xl font-bold ${isLoggedIn ? "text-gray-900" : "text-gray-500"}`;

  // const frameworks = ["React", "Vue", "Angular"];

  const increment_by_1 = () => {
    setCounter(counter + 1);
  }

  const decrement_by_1 = () => {
    setCounter(counter -1);
  };


    // const [favorites, setFavorites] = useState({});

    // const handleToggleFavorite = (framework) => {
    //   setFavorites((prevFavorites) => ({
    //     ...prevFavorites,
    //     [framework]: !prevFavorites[framework],
    //   }));
    // };

  return (
    <>
      {/* <h1 className="text-2xl font-bold">{isLoggedIn ? name : "Anonymous"}</h1> */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Counter: {counter}</h1>
        <button className="bg-teal-500 hover:bg-teal-900 rounded px-4 py-2 text-white font-bold " onClick={increment_by_1}>Ajouter de 1</button>
        <button className="bg-orange-500 hover:bg-orange-900 rounded px-4 py-2 text-white font-bold" onClick={decrement_by_1}>Décrémenter de 1</button>
      </div>

      {/* <div>
        {frameworks.map((framework, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="text-lg font-medium">{framework}</p>
            <button
              onClick={() => handleToggleFavorite(framework)}
              className="text-xl"
            >
              {favorites[framework] ? (
                <span role="img" aria-label="Heart">❤️</span>
              ) : (
                <span role="img" aria-label="Empty Heart">🤍</span>
              )}
            </button>
          </div>
        ))}
      </div> */}
    </>
  )
}

export default App
