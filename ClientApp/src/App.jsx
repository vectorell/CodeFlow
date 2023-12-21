import React, { useEffect, useState } from "react";
import "../src/styles/style.css";
import Search from "./components/Search";
import { useRecoilState } from "recoil";
import { entriesState } from "./recoil/entriesState";

export default function App() {
    const [dbEntries, setDbEntries] = useState();
    const [results, setResults] = useState(null);
    const [entries, setEntries] = useRecoilState(entriesState);

    async function fetchAll() {
        let data;
        try {
            const response = await fetch("http://localhost:5198/api/entries");
            data = await response.json();
        } catch (error) {
            console.log(error);
        } finally {
            const sortedData = data.sort((a, b) => {
                let titleA = a.title.toUpperCase();
                let titleB = b.title.toUpperCase();

                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });
            setEntries(sortedData);
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="App">
            <h1> CodeFlow </h1>
            <Search
                dbEntries={dbEntries}
                results={results}
                setResults={setResults}
            />
        </div>
    );
}
