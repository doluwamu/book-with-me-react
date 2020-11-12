import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


// Search functionality
const RentalSearch = () => {
    const [location, setLocation] = useState('')
    const history = useHistory();

    const handleSearch = () => {
        location ? history.push(`/rentals/${location}/homes`) : history.push('/');
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div 
        className="form-inline my-2 my-lg-0"
        >
            <input
                onKeyPress={handleKeyPress} 
                onChange={e => setLocation(e.target.value)}
                value={location}
                className="form-control mr-sm-2  bwm-search"
                type="search"
                placeholder="Try 'New York'"
            />
            <button
                className="btn btn-outline-success my-2 my-sm-0 btn-bwm-main"
                type="submit"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}

export default RentalSearch
