import React, { useEffect, useState } from "react";
import "../src/styles/style.css";
import Search from "./components/Search";
import fetchAllEntries from "./utils";

export default function App() {
    const [dbEntries, setDbEntries] = useState()
    const [results, setResults] = useState(null);
    
    async function fetchAll() {
        let data
        try {
            const response = await fetch('http://localhost:5198/api/entries');
            data = await response.json();
            // setEntries(data);
            console.log("App.jsx > fetchAll() > data: ", data);
            console.log("App.jsx > fetchAll() > SORTERAT: ", data.sort((a, b) => {
                let titleA = a.title.toUpperCase();
                let titleB = b.title.toUpperCase();

                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            }))
            // console.log("App.jsx > fetchAll() > dbEntries: ", dbEntries);
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
            })
            setDbEntries(sortedData)
        }
    }

    useEffect(() => {
        fetchAll();
    }, [])

    return (
        <div className="App">
            <h1> CodeFlow </h1>
            <Search 
                dbEntries={dbEntries} 
                results={results}
                setResults={setResults}/>
        </div>
    );
}
