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
                    <div key={index}>
                        <div className="result-card">
                            <p className="title">
                                {" "}
                                <span className="tag">{obj.tag}</span>:{" "}
                                {obj.name}{" "}
                            </p>
                            <div className="markdown">
                                <code> {obj.command} </code>
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
