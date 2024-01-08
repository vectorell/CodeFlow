import { useState, useRef, useEffect } from "react";
import "../styles/addentrie.css";
import fetchAllEntries, { filterNonAlphabeticalCharacters, saveFormattedText, sortByAscending, sortByAscendingTitle } from "../utils";
import { useRecoilState } from "recoil";
import { entriesState } from "../recoil/entriesState";
import { resultsState } from "../recoil/resultsState";
import { FaWindowClose } from "react-icons/fa";
import { ImSpinner7 } from "react-icons/im";



export default function AddEntrie({ showAddPost, setShowAddPost }) {
    const [isLoading, setIsLoading] = useState(false);
    const [requestErrorMessage, setRequestErrorMessage] = useState(' ');
    const [entries, setEntries] = useRecoilState(entriesState);
    const [results, setResults] = useRecoilState(resultsState);
    const [showErrorMessageTitle, setShowErrorMessageTitle] = useState(false);
    const [showErrorMessageDescription, setShowErrorMessageDescription] = useState(false);
    const [showErrorMessageField, setShowErrorMessageField] = useState(false);


    // TODO: Skapa funktionalitet för att spara alla värden till ett objekt 
    const titleRef = useRef(null);
    const titleMsgRef = useRef(null);
    const syntaxRef = useRef(null);
    const exampleRef = useRef(null);
    const descriptionRef = useRef(null);
    const descriptionMsgRef = useRef(null);
    const fieldRef = useRef(null);
    const fieldMsgRef = useRef(null);
    const subjectRef = useRef(null);
    const relatedRef = useRef(null);
    const reqErrorMsgRef = useRef(null);
    const selectRef = useRef(null);
    
    async function handleSend(e) {
        e.preventDefault()

        setShowErrorMessageTitle(false);
        setShowErrorMessageDescription(false);
        setShowErrorMessageField(false);

        const isTitleValid = (
            titleRef.current.value 
            && titleRef.current.value.length > 0 
            && typeof titleRef.current.value === 'string' 
            ? true : false
        );

        const isDescriptionValid = (
            descriptionRef.current.value 
            && descriptionRef.current.value.length > 3
            && typeof descriptionRef.current.value === 'string' 
            ? true : false
        );

        let isFieldSelected = selectRef.current.value === "defaultSelect" ? false : true;

        const isFieldInputValid = (
            fieldRef.current.value 
            && fieldRef.current.value.length >= 3
            && typeof fieldRef.current.value === 'string' 
            ? true : false
        );

        let field
        if (!isFieldSelected && isFieldInputValid) {
            field = fieldRef.current.value
        } else if (isFieldSelected && !isFieldInputValid) {
            field = selectRef.current.value
        } else {
            field = ''
        }

        if (!isTitleValid) { setShowErrorMessageTitle(true); }
        if (!isDescriptionValid) { setShowErrorMessageDescription(true); }
        if (!isFieldInputValid && !isFieldSelected) { setShowErrorMessageField(true); }
        if (!isDescriptionValid || !isTitleValid) { return }

        // Förbered related-array
        let rawRelatedArray = relatedRef.current.value.trim();
        let finishedRelatedArray = [];

        if (rawRelatedArray.includes(",")) {
            let splittedRelatedArray = rawRelatedArray.split(",")
            splittedRelatedArray.forEach(relObj => {
                if (relObj.trim() !== '') {
                    finishedRelatedArray.push(relObj);
                }
            })
        } 
        else if (rawRelatedArray !== '' && !rawRelatedArray.includes(",")) {
            finishedRelatedArray = rawRelatedArray;
        }

        // Skapa ett objekt från inputsen
        let entrieObject = {
            title: titleRef.current.value,
            syntax: saveFormattedText(e, syntaxRef),
            examples: saveFormattedText(e, exampleRef),
            description: saveFormattedText(e, descriptionRef),
            field: field,
            subject: subjectRef.current.value,
            related: finishedRelatedArray
        };

        console.log(entrieObject);

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entrieObject)
        }

        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5198/api/entries", options);
            let data = await response.json();
            console.log(data);

            setEntries(await fetchAllEntries())
            setResults(await fetchAllEntries())

            if (response.ok) {
                setShowAddPost(!showAddPost);
            } else {
                setRequestErrorMessage(data.title)
            }
            
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsLoading(false);
        }
    
    }

    
    // TODO: Lägga till REGEX-validering
    // TODO: Lägga in felmeddelanden till användare

    function handleKeyDown(e) {
        if(e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target;
            const cursorPosition = textarea.selectionStart;
            const value = textarea.value
            const updatedValue = value.substring(0, cursorPosition) + '\t' + value.substring(cursorPosition);
            textarea.value = updatedValue;
        }
    }

    function uniqueFields() {
        let uniqueArray = [];
        entries.forEach(entrie => {
                if (!uniqueArray.includes(entrie.field)) {
                    uniqueArray.push(entrie.field)
                }
            })
        return uniqueArray
    }

    function handleSelect() {
            fieldRef.current.value = '';
    }

    return (
        <div className="AddEntrie">
            <FaWindowClose id="close-post" onClick={() => setShowAddPost(false)}/>
            <div className="title">
                <h1 onClick={() => setShowAddPost(!showAddPost)}> Ny post + </h1>
            </div>

            <form action="#">

                {/* OMRÅDE */}
                <div className="form-field">

                    <p className="input-description">Område <span className="required">*</span><span className="input-msg" 
                    ref={fieldMsgRef}> {showErrorMessageField && 'obligatoriskt (välj i menyn eller ange 3-20 tecken)'} </span></p>

                    <div className="field-input-container">
                        <select ref={selectRef} onClick={() => handleSelect()} name="Område" id="">
                            <option value="defaultSelect"> Välj område </option>
                            { 
                                sortByAscending(uniqueFields()).map((entrie, index) => ( 
                                    <option value={entrie} key={index}> {entrie} </option> 
                            ))}
                        </select>
                        <input ref={fieldRef} onChange={() => setShowErrorMessageField(false)} type="text" placeholder=" .. eller skriv in nytt"/>
                    </div>
                </div>

                {/* TITEL */}
                <div className="form-field">
                    <p className="input-description">Titel <span className="required">*</span><span className="input-msg" 
                    ref={titleMsgRef}> {showErrorMessageTitle && 'obligatoriskt (3-50 tecken)'} </span></p>
                    <input ref={titleRef} onChange={() => setShowErrorMessageTitle(false)} type="text" placeholder=" ...till exempel 'Lista alla databaser'"/>
                </div>

                {/* SYNTAX */}
                <div className="form-field">
                    <p className="input-description">Syntax</p>
                    <textarea ref={syntaxRef} onKeyDown={(e) => handleKeyDown(e)} name="Syntax" id="syntax-text" cols="5" rows="5" placeholder=" ...till exempel 'SHOW DATABASES;'"></textarea>
                </div>

                {/* BESKRIVNING */}
                <div className="form-field">
                    <p className="input-description">Beskrivning <span className="required">*</span><span className="input-msg" 
                    ref={descriptionMsgRef}> {showErrorMessageDescription && 'obligatoriskt (minst 4 tecken)'} </span> </p>
                    <textarea ref={descriptionRef} onChange={() => setShowErrorMessageDescription(false)} name="Beskrivning" cols="5" rows="5" placeholder=""></textarea>
                </div>

                {/* EXEMPEL */}
                <div className="form-field">
                    <p className="input-description">Exempel</p>
                    <textarea ref={exampleRef} onKeyDown={(e) => handleKeyDown(e)} name="Exempel" id="example-text" cols="5" rows="5" placeholder=" Exempel"></textarea>
                </div>


                {/* ÄMNE */}
                <div className="form-field">
                    <p className="input-description">Ämne</p>
                    <input ref={subjectRef} type="text" placeholder=" Ämne (kommando, genväg etc)"/>
                </div>

                {/* RELATERAT */}
                <div className="form-field">
                    <p className="input-description">Relaterat (separera med ",")</p>
                    <input ref={relatedRef} type="text" placeholder=" Relaterat"/>
                </div>

                {/* KNAPPAR */}
                <div className="add-entrie-buttons-container">
                    <button onClick={(e) => {e.preventDefault(), setShowAddPost(!showAddPost)}}> Avbryt </button>
                    <button onClick={(e) => handleSend(e)}> {isLoading ? <ImSpinner7 className="loader"/> : 'Skicka'} </button>
                </div>
                <p id="obligatory">* = obligatoriskt</p>
                <p id="request-error" ref={reqErrorMsgRef}> {requestErrorMessage} </p>
            </form>
        </div>
    );
}
