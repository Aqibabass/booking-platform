import AccountNav from '@/AccountNav';
import Perks from '@/Perks';
import PhotosUploader from '@/PhotosUploader';
import axios from 'axios';

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

function PlacesFormPage() {
    const {id} = useParams();
    console.log({id});
        const [title, setTitle] = useState('');
        const [address, setAddress] = useState('');
        const [addedPhotos, setAddedPhotos] = useState([]);
        const [description, setDescription] = useState('');
        const [perks, setPerks] = useState([]);
        const [extraInfo, setExtraInfo] = useState('');
        const [checkIn, setCheckIn] = useState('');
        const [checkOut, setCheckOut] = useState('');
        const [maxGuests, setMaxGuests] = useState(1);
        const [redirect,setRedirect] = useState(false);
        useEffect(() => {
               if (!id) {
                return;
               } 
               axios.get('/places/'+id).then(response =>{
                    const{data}= response;
                    setTitle(data.title);
                    setAddress(data.address);
                    setAddedPhotos(data.photos);
                    setDescription(data.description);
                    setPerks(data.perks);
                    setExtraInfo(data.extraInfo);
                    setCheckIn(data.checkIn);
                    setCheckOut(data.checkOut);
                    setMaxGuests(data.maxGuests);
                
                } );
        },[id]);

        function inputHeader(text) {
            return (
    
                <h2 className='text-2xl mt-4'>{text}</h2>
            );
        }
        function inputDescription(text) {
            return (
                <p className='text-gray-500 text-sm'>{text}</p>
    
            );
        }
        function preInput(header, description) {
            return (
                <>
                    {inputHeader(header)}
                    {inputDescription(description)}
                    { }       </>
            )
        }
    async function addNewPlace(ev){
        ev.preventDefault();
       
        await axios.post('/places', 
            {title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests
        });
        setRedirect(true);
    };

    if(redirect){
      return < Navigate to ={'/account/places'}/>
    }
  return (

    <div>
        <AccountNav/>
    <form onSubmit={addNewPlace}>
        {preInput('Title', 'Provide a catchy title for your place, like an advertisement.')}
        <input type='text'
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            placeholder='title, for example My lovely apt' />

        {preInput('Address', 'Enter the address of this place.')}
        <input type='text'
            value={address}
            onChange={ev => setAddress(ev.target.value)}
            placeholder='address' />

        {preInput('Photos', 'Add multiple photos to showcase your place better.')}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput('Description', 'Provide a detailed description of the place.')}
        <textarea
            value={description}
            onChange={ev => setDescription(ev.target.value)} />

        {preInput('Perks', 'Select all the amenities available at your place.')}

        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput('Extra Info', 'Include house rules and any other relevant information.')}
        <textarea
            value={extraInfo}
            onChange={ev => setExtraInfo(ev.target.value)} />

        {preInput('Check-in & Check-out Times', 'Specify check-in and check-out times, ensuring time for cleaning between guests.')}
        <div className='grid  gap-2 sm:grid-cols-3'>
            <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input type="text" value={checkIn}
                    onChange={ev => setCheckIn(ev.target.value)} placeholder='14' />
            </div>

            <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input type="text"
                    value={checkOut}
                    onChange={ev => setCheckOut(ev.target.value)}
                    placeholder='11' />
            </div>

            <div>
                <h3 className='mt-2 -mb-1'>Max Number of Guests</h3>
                <input type="number"
                    value={maxGuests}
                    onChange={ev => setMaxGuests(ev.target.value)} />
            </div>
        </div>

        <button className='primary my-4'>Save</button>

    </form>
</div>
      
    
  )
}

export default PlacesFormPage