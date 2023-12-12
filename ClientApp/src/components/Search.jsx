import React, { useEffect, useState } from "react";
import { useRef } from "react";
import data from "../data/testData.json";
import Results from "./Results.jsx";
import "../styles/search.css";
import "../styles/root.css";

export default function Search() {
    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState(null);
    const searchInputRef = useRef(null);

    function handleChange() {
        const searchString = searchInputRef.current.value.toLowerCase();
        const isSearchAccepted = /^$|^[a-zA-Z0-9\-_\s]+$/.test(searchString);

        if (isSearchAccepted === false) {
            return;
        } else {
            let searchResult = data.filter((obj) => {
                return obj.name.toLowerCase().includes(searchString);
            });

            searchString.length > 0
                ? setResults(searchResult)
                : setResults(data);
        }
    }

    useEffect(() => {
        setResults(data);
    }, []);

    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Sök här..."
                ref={searchInputRef}
                onChange={handleChange}
            />
            <Results searchResult={results} />
        </div>
    );
}
