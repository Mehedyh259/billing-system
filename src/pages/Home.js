import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div class="hero min-h-[calc(100vh-200px)] bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-xl">
                    <h1 class="text-4xl font-bold mb-4 uppercase">Welcome to billing system</h1>
                    <Link to='/bills' class="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;