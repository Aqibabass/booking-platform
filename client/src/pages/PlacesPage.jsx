import Perks from '@/Perks';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

function PlacesPage() {

    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
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
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
        setAddedPhotos(prev => {
            return[...prev, filename];
        });
        setPhotoLink('');
    }
   
    return (
        <div>
            {action !== 'new' && (

                <div className='text-center'>
                    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new place
                    </Link>


                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
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
                        <div className='flex gap-2'>
                            <input type="text"
                             value={photoLink}
                            onChange={ev => setPhotoLink(ev.target.value)}
                            placeholder='Add using a link ....jpg' />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>
                        <div className=' mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                           
                           {addedPhotos.length >0 && addedPhotos.map(link => (
                            <div>
                              <img className="rounded-2xl " src={'http://localhost:4000/uploads/'+link}alt="" />
                            </div>

                           ))}
                            <button className=' flex items-center border justify-center gap-1 bg-transparent rounded-2xl  text-2xl p-2 text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload</button>
                        </div>
                        {preInput('Description','Provide a detailed description of the place.')}
                       <textarea 
                       value={description} 
                       onChange={ev => setDescription(ev.target.value)} />

                        {preInput('Perks','Select all the amenities available at your place.')}
                    

                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>

                        {preInput('Extra Info','Include house rules and any other relevant information.')}
                        <textarea
                        value={extraInfo}
                        onChange={ev => setExtraInfo(ev.target.value)} />
                        
                        {preInput('Check-in & Check-out Times','Specify check-in and check-out times, ensuring time for cleaning between guests.')}
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
                                <Perks/>
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
            )}


        </div>
    )
}

export default PlacesPage
