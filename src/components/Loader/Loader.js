import React from 'react';
import './Loader.css';
import { useLoader } from '../../context/LoaderContext';

const Loader = () => {
    const { loading } = useLoader();
    if (!loading) return null;
    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
