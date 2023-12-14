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
                    <div key={index}>
                        <details className="details">
                            <summary>
                                <div className="summary-header">
                                    <p id="entrie-id">#{obj.id}</p>
                                    <span className="command-title">
                                        <span className="field">
                                            {obj.field}:
                                        </span>{" "}
                                        {obj.title}
                                    </span>
                                </div>
                                <div className="markdown-summary">
                                    <code> {obj.syntax} </code>
                                </div>
                            </summary>

                            <div className="result-card">
                                <p className="info-header">Beskrivning:</p>
                                <pre className="description">
                                    {obj.description}{" "}
                                </pre>
                                <div className="markdown">
                                    <code> {obj.syntax} </code>
                                </div>
                                {obj.examples && (
                                    <>
                                        <p className="info-header">Exempel:</p>
                                        <div className="markdown">
                                            <code> {obj.examples} </code>
                                        </div>
                                    </>
                                )}
                            </div>
                        </details>
                        <div className="related">
                            <p> Relaterat: </p>
                            {obj.related?.length > 0 &&
                                obj.related?.map((relatedObject, index) => (
                                    <p key={index} className="related-subject">
                                        {" "}
                                        {relatedObject}{" "}
                                    </p>
                                ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-result-card">
                    <p className="no-results"> Inga resultat </p>
                </div>
            )}
        </section>
    );
}
