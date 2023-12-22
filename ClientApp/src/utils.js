export default async function fetchAllEntries() {
    const options = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }

    const response = await fetch('http://localhost:5198/api/entries', options);
    const data = await response.json()
    return data
}

function filterNonAlphabeticalCharacters(inputString) {
    return inputString.replace(/[^a-zA-ZåÅäÄöÖ]/g, '');
}



export function sortByAscendingTitle(entries) {
    // console.log('entries: ', entries);

    // let sortedEntries = [...entries]
    let sortedEntries = [...entries].sort((a, b) => {
        let titleA = filterNonAlphabeticalCharacters(a.title.toUpperCase());
        let titleB = filterNonAlphabeticalCharacters(b.title.toUpperCase());

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    })

    return sortedEntries;
}

export function sortByDescendingTitle(entries) {
    let sortedEntries = [...entries].sort((a, b) => {
        let titleA = filterNonAlphabeticalCharacters(a.title.toUpperCase());
        let titleB = filterNonAlphabeticalCharacters(b.title.toUpperCase());

        if (titleA < titleB) {
            return 1;
        }
        if (titleA > titleB) {
            return -1;
        }
        return 0;
    })

    return sortedEntries;
}

export function sortByNewToOld(entries) {
    let sortedEntries = [...entries].sort((a, b) => {

        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    })

    return sortedEntries;
}
export function sortByOldToNew(entries) {
    let sortedEntries = [...entries].sort((a, b) => {

        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    })

    return sortedEntries;
}


export function copyToClipboard(content) {
    navigator.clipboard.writeText(content);
}

export function saveFormattedText(e, input) {
    e.preventDefault()
    const formattedText = input.current.value.replace(/\n/g, "\n").replace(/ {4}/g, "\t");
    console.log('formattedText: ', formattedText);
    return formattedText;
}