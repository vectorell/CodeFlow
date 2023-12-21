import React, { useEffect, useState, useRef } from "react";
import Results from "./Results.jsx";
import { entriesState } from "../recoil/entriesState.js";
import { useRecoilState } from "recoil";
import "../styles/search.css";
import "../styles/root.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
    sortByAscendingTitle,
    sortByDescendingTitle,
    sortByNewToOld,
    sortByOldToNew,
} from "../utils.js";
import { sortState } from "../recoil/sortState.js";

export default function Search() {
    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("Resultat:");
    const [feedbackMessageOk, setFeedbackMessageOk] = useState(true);
    const [entries, setEntries] = useRecoilState(entriesState);
    const [sortType, setSortType] = useRecoilState(sortState);
    const [sortMessage, setSortMessage] = useState("Sortering");
    const searchInputRef = useRef(null);
    const feedbackMsgText = useRef(null);
    const [reload, setReload] = useState(false);

    function handleChange() {
        const searchString = searchInputRef.current.value.toLowerCase();
        const isSearchAccepted = /^$|^[a-zA-ZåÅäÄöÖ0-9\-_#.\s]+$/.test(searchString);

        if (isSearchAccepted === false) {
            setFeedbackMessage("Icke tillåtna tecken funna");
            setFeedbackMessageOk(false);
            return;
        } else {
            setFeedbackMessageOk(true);
            setFeedbackMessage("Resultat:");
            let searchResult = entries.filter((obj) => {
                if (
                        obj.title?.toLowerCase().includes(searchString)
                    ||  obj.syntax?.toLowerCase().includes(searchString)
                    ||  (obj.id).toString()?.includes(searchString)
                    ||  obj.field?.toLowerCase().includes(searchString)
                    ||  obj.subject?.toLowerCase().includes(searchString)
                    ||  obj.examples?.toLowerCase().includes(searchString)
                    ||  obj.description?.toLowerCase().includes(searchString)
                    ) {
                        return obj
                    }
            });

            searchString.length > 0
                ? setResults(entriesSorter(sortType, searchResult))
                : setResults(entriesSorter(sortType, results));
        }
    }

    function entriesSorter(choice, array) {
        if (!array) {
            return;
        }

        choice === "AscName" &&
            (sortByAscendingTitle(array),
            setSortMessage("Titel A-Ö"),
            setSortType("AscName"));

        choice === "DescName" &&
            (sortByDescendingTitle(array),
            setSortMessage("Titel Ö-A"),
            setSortType("DescName"));

        choice === "AscNew" &&
            (sortByNewToOld(array),
            setSortMessage("Nyast först"),
            setSortType("AscNew"));

        choice === "DescNew" &&
            (sortByOldToNew(array),
            setSortMessage("Nyast sist"),
            setSortType("DescNew"));

        return array;
    }

    function handleClick(choice) {
        setSortType(choice);
        setResults(entriesSorter(choice, results));
    }

    useEffect(() => {
        setReload(true);
    }, [entries]);

    return (
        <div className="Search">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Sök här..."
                    maxLength={20}
                    ref={searchInputRef}
                    onChange={handleChange}
                />
                <div className="sort-container">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={sortMessage}
                    >
                        <Dropdown.Item
                            href="#/action-1"
                            onClick={() => handleClick("AscName")}
                        >
                            Titel A-Ö
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#/action-2"
                            onClick={() => handleClick("DescName")}
                        >
                            Titel Ö-A
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#/action-3"
                            onClick={() => handleClick("AscNew")}
                        >
                            Nyast först
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#/action-3"
                            onClick={() => handleClick("DescNew")}
                        >
                            Nyast sist
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <p
                id={feedbackMessageOk ? "results-text" : "results-text-error"}
                ref={feedbackMsgText}
            >
                {" "}
                {feedbackMessage}{" "}
            </p>
            <Results searchResult={results} />
        </div>
    );
}
