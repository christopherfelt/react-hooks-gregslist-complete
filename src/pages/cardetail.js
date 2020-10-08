import React from 'react';

const CarDetail = ({match:{params:{carId}}}) => {
    return (
        <div>
            <h1>Car Detail is Live {carId} </h1>
        </div>
    );
}

export default CarDetail;
