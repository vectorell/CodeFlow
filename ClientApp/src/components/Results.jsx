/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../styles/results.css";
import "../styles/root.css";


export default function Results({ searchResult, entries }) {
    const [foundResults, setFoundResults] = useState(searchResult);
    

    useEffect(() => {
        setFoundResults(searchResult);
    }, [searchResult]);

    return (
        <section className="Results">
            <hr />
            {foundResults && foundResults.length > 0 ? (
                foundResults.map((obj, index) => (
                    <details key={index} className="details">

                        <summary> 
                            <span className="field">{obj.field}:</span> 
                            <span className="command-subject">{obj.subject}</span> 
                            {/* obj.id endast för dev, TODO */}
                            <p style={{ color: 'grey', marginLeft: "0.5em"}}>(id: { obj.id})</p> 
                            <span className="command-name">{ obj.title}</span> 
                        </summary>

                        <div className="result-card">
                            <p className="info-header">Beskrivning:</p>
                            <div className="markdown">
                                <code> {obj.syntax}  </code>
                            </div>
                            <pre className="description">{obj.description} </pre>
                            <p className="info-header">Exempel:</p>
                            <div className="markdown">
                                <code> {obj.examples}  </code>
                            </div>
                        </div>
                        <div className="related">
                            <p> Relaterat: </p>
                            {obj.related?.map((relatedObject, index) => (
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
