import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      setPlace(response.data)
    })
  }, [id]);

  if (!place) return '';

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black  min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-2xl text-white'> Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)}
              className='fixed right-12 top-7 flex gap-1 py-2 px-4 rounded-2xl shadow:sm shadow-black bg-white text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

              Close photos</button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div>
              <img className='w-full h-[400px] object-cover' src={'http://localhost:4000/uploads/' + photo} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-4 bg-gray-50 -mx-8 px-8 py-8'>
      <h1 className='text-3xl'> {place.title}</h1>

      <a className='my-3 flex gap-1 block font-semibold underline' target="_blank"
        href={'http://maps.google.com/?q=' + place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {place.address}</a>

      <div className="relative">
        <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
          <div>
            {place.photos?.[0] && (
              <div>
                <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
              </div>
            )}
          </div>

          <div className='grid'>
            {place.photos?.[1] && (
              <div>
                <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
              </div>
            )}
            {place.photos?.[2] && (
              <div className=' overflow-hidden'>
                <img className='aspect-square object-cover relative top-2 ' src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
              </div>

            )}
          </div>

        </div>
        <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow-sm shadow-gray-500'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

          show more photos
        </button>
      </div>

      <div>
              for description
      </div>
    </div>
  )
}

export default PlacePage
