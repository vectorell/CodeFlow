/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { IoIosArrowDropup } from "react-icons/io";
import { useRecoilState } from "recoil";
import { entriesState } from "../recoil/entriesState";
import { copyToClipboard, editEntrie } from "../utils";
import "../styles/results.css";
import "../styles/root.css";
import { resultsState } from "../recoil/resultsState";
import EditEntrie from "./EditEntrie";
import { saveFormattedText } from "../utils";
import fetchAllEntries from "../utils";

export default function Results() {
    const [foundResults, setFoundResults] = useState(null);
    // const [foundResults, setFoundResults] = useRecoilState(resultsState);
    const [entries, setEntries] = useRecoilState(entriesState);
    const [results, setResults] = useRecoilState(resultsState);
    const [editPosts, setEditPosts] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const fieldInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const syntaxInputRef = useRef(null);
    const descriptionTextAreaRef = useRef(null);
    const examplesTextAreaRef = useRef(null);

    useEffect(() => {
        setFoundResults(results);
    }, [results]);

    function handleEditPost(id) {
        setEditPosts((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }

    async function handleSavePost(e, obj) {

        if (descriptionTextAreaRef.current.value <= 2) {return}
        if (titleInputRef.current.value <= 2) {return}
        if (!fieldInputRef.current.value > 0) {return}

        console.log('obj in handleSavePost: ', obj);
        let subject
        let related
        if (obj.subject) { subject = obj.subject } else { subject = ''}
        if (obj.related) { related = obj.related } else { related = []}

        let objectToSave = {
            id: obj.id,
            title: titleInputRef.current.value,
            syntax: saveFormattedText(e, syntaxInputRef),
            examples: saveFormattedText(e, examplesTextAreaRef),
            description: saveFormattedText(e, descriptionTextAreaRef),
            field: fieldInputRef.current.value,
            subject: subject,
            related: related
        }
        console.log('objectToSave: ', objectToSave);
        try {
            await editEntrie(objectToSave)
            setEntries(await fetchAllEntries())
            setResults(await fetchAllEntries())
        } catch (error) {
            console.log(error)
        } finally {
            setEditPosts(false)

        }
    }

    function disableSpacebarToggle(e) {
        if (e.keyCode === 32) { 
            e.preventDefault()
            e.target.value = e.target.value + ' '
        }
    }

    function adjustTextareaHeight(elementRef) {
        if (elementRef.current) {
            elementRef.current.style.height = 'auto';
            elementRef.current.style.height = `${elementRef.current.scrollHeight}px`;
            console.log(elementRef.current.scrollHeight);
          }
    }

    useEffect(() => {
        adjustTextareaHeight(syntaxInputRef)
        adjustTextareaHeight(examplesTextAreaRef)
        adjustTextareaHeight(descriptionTextAreaRef)
    })

    function handleChange(elementRef) {
        adjustTextareaHeight(elementRef)
    }


    useEffect(() => {
        console.log(editPosts);
    }, [editPosts]);

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

                                    {!editPosts[obj.id] ? (
                                        <span className="command-title">
                                            <span className="field">
                                                {obj.field}:
                                            </span>{" "}
                                            {obj.title}
                                        </span>
                                    ) : (
                                        <div className="edit-field-title-container">
                                            <input
                                                type="text"
                                                ref={fieldInputRef}
                                                placeholder="Ämne"
                                                className="input-edit"
                                                id="field-edit"
                                                defaultValue={obj.field}
                                                onKeyDown={(e) => disableSpacebarToggle(e)}
                                            ></input>
                                            <input
                                                type="text"
                                                ref={titleInputRef}
                                                placeholder="Titel"
                                                className="input-edit"
                                                id="title-edit"
                                                defaultValue={obj.title}
                                                onKeyDown={(e) => disableSpacebarToggle(e)}
                                            ></input>
                                        </div>
                                    )}
                                </div>

                                {obj.syntax && !editPosts[obj.id] === true ? (
                                    <div className="markdown-summary">
                                        <pre>{obj.syntax}</pre>
                                        <button
                                            className="copy-button summary"
                                            onClick={() =>
                                                copyToClipboard(obj.syntax)
                                            }
                                        >
                                            {" "}
                                            Kopiera{" "}
                                        </button>
                                    </div>
                                ) : !editPosts[obj.id] === false && (
                                    <textarea
                                    name=""
                                    id="textarea-syntax"
                                    cols="30"
                                    // rows="5"
                                    placeholder="..syntax"
                                    ref={syntaxInputRef}
                                    defaultValue={obj.syntax}
                                    className="markdown-summary textarea-edit "
                                    onKeyDown={(e) => disableSpacebarToggle(e)}
                                    onChange={() => handleChange(syntaxInputRef)}
                                ></textarea>
                                )}
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
                                {!editPosts[obj.id] ? (
                                    <pre className="description">
                                        {obj.description}{" "}
                                    </pre>
                                ) : (
                                    <textarea
                                        name=""
                                        id="description-edit"
                                        cols="30"
                                        // rows="5"
                                        // placeholder={obj.description}
                                        ref={descriptionTextAreaRef}
                                        defaultValue={obj.description}
                                        className="textarea-edit"
                                        onChange={() => handleChange(descriptionTextAreaRef)}
                                    ></textarea>
                                )}
                                {obj.examples && !editPosts[obj.id] === true ? (
                                    <>
                                    <p className="info-header">Exempel:</p>
                                        <div className="markdown">
                                            <pre>{obj.examples}</pre>
                                            <button
                                                className="copy-button example"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        obj.examples
                                                        )
                                                }
                                            >
                                                Kopiera
                                            </button>
                                        </div>
                                    </>
                                ) : editPosts[obj.id] === true && (
                                    <>
                                        <p className="info-header">Exempel:</p>
                                        <textarea
                                            name=""
                                            id="textarea-examples"
                                            cols="30"
                                            // rows="5"
                                            // placeholder={obj.examples}
                                            ref={examplesTextAreaRef}
                                            defaultValue={obj.examples}
                                            className="textarea-edit"
                                            onChange={() => handleChange(examplesTextAreaRef)}
                                        ></textarea>
                                    </>
                                )}
                                <div>
                                    {!editPosts ? (
                                        <button
                                            onClick={() => {
                                                handleEditPost(obj.id);
                                            }}
                                        >
                                            {" "}
                                            Redigera{" "}
                                        </button>
                                    ) : (
                                        <div className>
                                            <button
                                                onClick={() =>
                                                    setEditPosts(!editPosts)
                                                }
                                            >
                                                Avbryt
                                            </button>
                                            <button onClick={(e) => handleSavePost(e, obj)}> Spara </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="related">
                                <p> Relaterat: </p>
                                {obj.related?.length > 0 &&
                                    obj.related?.map((relatedObject, index) => (
                                        <p
                                            key={index}
                                            className="related-subject"
                                        >
                                            {" "}
                                            {relatedObject}{" "}
                                        </p>
                                    ))}
                            </div>
                        </details>
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
