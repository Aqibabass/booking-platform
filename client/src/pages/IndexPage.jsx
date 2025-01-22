import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places')
      .then(response => {
        setPlaces(response.data);
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

      {places.length > 0 && places.map(place => (
        
        <Link to={'/place/' +place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt={place.title}
              />
            )}
          </div>
          <h2 className='font-medium text-xl mt-2 '>{place.address}</h2>
          <h3 className='mt-2 font-medium  text-gray-600'>{place.title}</h3>
              <div className='mt-2 font-semibold text-lg'>
              ₹{place.price} per night
              </div>
        </Link>
      ))}
    </div>
  );
}

export default IndexPage;
