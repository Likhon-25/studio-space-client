import React from 'react';

const MyBookingPage = async() => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/booking`,
        { cache: "no-store" }
    )
    const data = res.ok ? await res.json() : []
    console.log(data);
    return (
        <div>
            <h2>My Bookings</h2>
        </div>
    );
};

export default MyBookingPage;