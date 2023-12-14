export default async function fetchAllEntries() {
    const options = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }

    const response = await fetch('http://localhost:5198/api/entries', options);
    const data = await response.json()
    return data
}