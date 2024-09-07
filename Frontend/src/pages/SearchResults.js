import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '..styles/SearchResults.css';

const SearchResults = ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(location.search).get('date');

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:8080/api/milk-deliveries?date=${query}`)
                .then(response => {
                    setResults(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the results!", error);
                    setLoading(false);
                });
        }
    }, [query]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="search-results">
            <h1>Search Results for {query}</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {results.map(result => (
                        <li key={result.id}>
                            {result.date} - {result.milkQuantity} liters
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
