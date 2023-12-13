import React, { useEffect, useState } from "react";
import { useRef } from "react";
import data from "../data/testData.json";
import Results from "./Results.jsx";
import "../styles/search.css";
import "../styles/root.css";

export default function Search() {
    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('Resultat:');
    const [feedbackMessageOk, setFeedbackMessageOk] = useState(true);
    const searchInputRef = useRef(null);
    const feedbackMsgText = useRef(null);

    function handleChange() {
        const searchString = searchInputRef.current.value.toLowerCase();
        const isSearchAccepted = /^$|^[a-zA-Z0-9\-_\s]+$/.test(searchString);

        if (isSearchAccepted === false) {
            setFeedbackMessage('Icke tillåtna tecken funna');
            setFeedbackMessageOk(false);
            return;
        } else {
            setFeedbackMessageOk(true);
            setFeedbackMessage('Resultat:')
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
                maxLength={20}
                ref={searchInputRef}
                onChange={handleChange}
            />
            <p id={feedbackMessageOk ? "results-text" : "results-text-error"} ref={feedbackMsgText}> {feedbackMessage} </p>
            <Results searchResult={results} />
        </div>
    );
}
