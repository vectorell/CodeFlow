import React, { useEffect, useState } from "react";
import "../src/styles/style.css";
import Search from "./components/Search";
import { useRecoilState } from "recoil";
import { entriesState } from "./recoil/entriesState";
import AddEntrie from "./components/AddEntrie";
import fetchAllEntries, { sortByAscendingTitle } from "./utils";
import { resultsState } from "./recoil/resultsState";
import Results from "./components/Results";

export default function App() {
    const [dbEntries, setDbEntries] = useState();
    const [results, setResults] = useRecoilState(resultsState);
    const [entries, setEntries] = useRecoilState(entriesState);
    const [showAddPost, setShowAddPost] = useState(false);
    


    async function fetchAll() {
        let data;
        try { data = await fetchAllEntries() } 
        catch (error) { console.error(error); } 
        finally { setEntries(data), setResults(entries) }
    }

    useEffect(() => {
        fetchAll();
    }, []);

    // useEffect(() => {
    //     fetchAll();
    // }, [results]);

    useEffect(() => {
        function handleEscapeKey(e) {
            if (e.key === 'Escape') {
                setShowAddPost(false);
            }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => { document.removeEventListener('keydown', handleEscapeKey);}
    }, [])


    function handleEvent(e) {
        if (showAddPost === true)
        setShowAddPost(false);
    }


    return (
        <div className="App" >
            <div className="blur" onMouseDown={handleEvent} style={{ visibility: showAddPost ? 'visible' : 'hidden'}}>
                
            </div>
            <h1> CodeFlow </h1>
            {showAddPost && <AddEntrie showAddPost={showAddPost} setShowAddPost={setShowAddPost} />}
            <Search showAddPost={showAddPost} setShowAddPost={setShowAddPost}/>
        </div>
    );
}
