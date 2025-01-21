import axios from 'axios';
import React, { useEffect, useState } from 'react';

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places')
      .then(response => {
        const duplicatedData = [
          ...response.data,
          ...response.data,  // 2nd copy
          ...response.data,  // 3rd copy
          ...response.data,  // 4th copy
          ...response.data,  // 5th copy
        ];
        setPlaces(duplicatedData);
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

      {places.length > 0 && places.map(place => (
        <div>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt={place.title}
              />
            )}
          </div>
          <h2 className='mt-2 text-sm truncate  text-gray-600'>{place.title}</h2>
          <h2 className='font-bold  text-gray-600'>{place.address}</h2>
        </div>
      ))}
    </div>
  );
}

export default IndexPage;
