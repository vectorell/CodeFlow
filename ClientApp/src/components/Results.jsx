/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../styles/results.css";
import "../styles/root.css";


export default function Results({ searchResult }) {
    const [foundResults, setFoundResults] = useState(searchResult);
    

    useEffect(() => {
        setFoundResults(searchResult);
    }, [searchResult]);

    return (
        <section className="Results">
            <p id="results-text"> Resultat: </p>
            <hr />
            {foundResults && foundResults.length > 0 ? (
                foundResults.map((obj, index) => (
                    <details key={index} className="details">

                        <summary> 
                            <span className="tag">{obj.tag}:</span> <span className="command-name">{obj.name}</span> 
                        </summary>

                        <div className="result-card">
                            <div className="markdown">
                                <pre> {obj.command}  </pre>
                            </div>
                            <p className="description"> {obj.description} </p>
                        </div>
                        <div className="related">
                            <p> Relaterat: </p>
                            {obj.related.map((relatedObject, index) => (
                                <p key={index} className="related-subject">
                                    {" "}
                                    {relatedObject}{" "}
                                </p>
                            ))}
                        </div>
                    </details>
                ))
            ) : (
                <div className="no-result-card">
                    <p className="no-results"> Inga resultat </p>
                </div>
            )}
        </section>
    );
}
