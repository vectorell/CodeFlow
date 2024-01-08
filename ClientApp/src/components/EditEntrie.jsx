import { useEffect, useState } from "react";

export default function EditEntrie({ obj, editPosts, setEditPosts }) {
    const [editedObj, setEditedObj] = useState({ ...obj }); // En state för ändringar i objektet


    function handleClick() {
        setEditPosts(true);
        console.log(editPosts);
        console.log('hej');
        console.log(obj)
    };

    function handleSave() {
        console.log(obj);
    }

    useEffect(() => {
        console.log(editPosts);
    }, [])

    return (
        <div className="EditEntrie">
            {!editPosts ? 
                <button onClick={handleClick}> Redigera </button>
                : <>
                    <button onClick={() => setEditPosts(!editPosts)}> Avbryt </button>
                    <button onClick={handleSave}> Spara </button>
                </>
            }
        </div>
    )
}