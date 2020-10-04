import React from 'react';
import Car from '../components/car';
import Cars from '../components/cars'

const Homepage = () => {
    return (
        <div>
            <h1>Home Page</h1>

            <div className="container">
                <Cars></Cars>
            </div>
            
        </div>
    );
}

export default Homepage;
