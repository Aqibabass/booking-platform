import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user}=useContext(UserContext);
   
    useEffect(()=>{
        if (user){
            setName(user.name);
        }

    },[user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
       
      const  response = await axios.post('/bookings', {checkIn, checkOut, numberOfGuests,
        name, phone, 
        place:place._id,
        price:numberOfNights * place.price,
    });
   
    const bookingId = response.data._id;
   
    setRedirect(`/account/bookings/${bookingId}`);
    }
   
    if(redirect) {
        return <Navigate to= {redirect} />
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ₹{place.price} / per night
            </div>

            <div className="border rounded-2xl items-center mt-4">
                <div className="flex flex-col">
                    <div className=' mt-4 px-4'>
                        <label>Check in: </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            min={today}
                        />
                    </div>

                    <div className='mt-4 px-4'>
                        <label>Check out: </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            min={checkIn || today}
                        />
                    </div>
                </div>

                <div>
                    <div className='my-4 py-3 px-4 border-t'>
                        <label>Number of guests:</label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={ev => setNumberOfGuests(Number(ev.target.value))}

                            min={1}
                        />
                    </div>
                    {numberOfNights > 0 && (
                        <div className='my-4 py-3 px-4 border-t'>
                            <label>Your Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />

                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={ev => setphone(ev.target.value)}
                            />

                        </div>

                    )}
                </div>
            </div>

            <button onClick={bookThisPlace}
            className='primary mt-4'>
                Book this place
                {numberOfNights > 0 && (
                    <span> ₹{numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}

export default BookingWidget;
