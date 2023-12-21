/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { IoIosArrowDropup } from "react-icons/io";
import { useRecoilState } from 'recoil';
import { entriesState } from "../recoil/entriesState";
import { copyToClipboard } from "../utils";
import "../styles/results.css";
import "../styles/root.css";

export default function Results({ searchResult }) {
    const [foundResults, setFoundResults] = useState(searchResult);
    const [isExpanded, setIsExpanded] = useState(false);

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
                                    <pre>{obj.syntax}</pre>
                                            <button className="copy-button summary"
                                                onClick={() => copyToClipboard(obj.syntax)}
                                            > Kopiera </button>
                                </div>
                                <div className="expand-div">
                                    <p> läs mer </p>
                                    {isExpanded ? (
                                        <IoIosArrowDropup className="toggle-view expand" />
                                    ) : (
                                        <MdOutlineExpandCircleDown className="toggle-view expand" />
                                    )}
                                </div>
                            </summary>

                            <div className="result-card">
                                <p className="info-header">Beskrivning:</p>
                                <pre className="description">
                                    {obj.description}{" "}
                                </pre>
                                {obj.examples && (
                                    <>
                                        <p className="info-header">Exempel:</p>
                                        <div className="markdown">
                                            <pre>{obj.examples}</pre>
                                            <button className="copy-button example"
                                                onClick={() => copyToClipboard(obj.examples)}
                                            > 
                                                Kopiera 
                                            </button>
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
