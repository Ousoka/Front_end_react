import React, { useState } from 'react';

export function ProductCard({
  id,
  image,
  title,
  content,
  quantity,
  price,
  isFavorite,
  onToggleFavorite,
  onBuy,
  onDelete,
  onEdit
}) {
  const [showSpecs, setShowSpecs] = useState(false);

  const handleToggleSpecs = () => {
    setShowSpecs(!showSpecs);
  };

  const availability = quantity > 0 ? `${quantity} article(s) disponible(s)` : 'Indisponible';

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-4">

      <div className="flex justify-end">
        <button
          onClick={onToggleFavorite}
          className="text-xl focus:outline-none"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="flex items-center justify-center bg-gray-100 h-64">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>


      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>


        <p className="mt-2 text-sm text-gray-600">
          Specifications: 
          <button
            onClick={handleToggleSpecs}
            className="ml-2 text-blue-500 hover:underline"
          >
            {showSpecs ? 'Hide' : 'Show'}
          </button>
        </p>
        {showSpecs && (
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            {content.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        )}


        <p
          className={`mt-4 ${
            quantity > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {availability}
        </p>


        <p className="text-sm font-medium text-gray-700">Price: ${price}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={onBuy}
            disabled={quantity <= 0}
            className={`px-4 py-2 rounded-lg ${
              quantity > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Buy product
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit product
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete product
          </button>
        </div>


      </div>
    </div>
  );
}
