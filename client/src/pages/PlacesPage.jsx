import AccountNav from '@/AccountNav';
import PlaceImg from '@/PlaceImg';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    axios.get('/user-places')
      .then(({ data }) => {
      
        setPlaces(data);
      })
      .catch(error => {
        console.error("Error fetching places:", error);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-6">
        {places.length > 0 ? (
          places.map(place => (
            <Link 
              to={'/account/places/'+place._id} 
              key={place._id} 
              className="flex flex-col sm:flex-row gap-4 bg-gray-100 p-4 rounded-2xl mb-4"
            >
             
              
              <div className="flex aspect-video h-sm:w-32 sm:h-32 bg-gray-300 grow-0 shrink-0 overflow-hidden rounded-xl">
              
                <PlaceImg place ={place}/>
             
              </div>
              
              
              <div className="grow sm:ml-4 px-1">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm mt-2 text-gray-600 line-clamp-3">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesPage;
