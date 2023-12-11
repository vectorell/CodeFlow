import React from 'react';
import { useEffect, useState } from "react"
import '../styles/test.css'

export default function TestComponent() {
    const [weatherObjects, setWeatherObjects] = useState(null);

    useEffect(() => {
        async function fetchAPI() {
            const response = await fetch('/weatherforecast');
            const data = await response.json();
            console.log(data);
            setWeatherObjects(data)
        }
        fetchAPI()
    }, [])


    return (
        <>
            {weatherObjects && weatherObjects.map((weatherObject, index) => (
                <div key={index} className="weather-object-container">
                    <p> {weatherObject.date.toLocaleString('sv-SE')} </p>
                    <p> How it feels? Well, {weatherObject.summary.toLowerCase()}. </p>
                    <p> It&apos;s {weatherObject.temperatureC} degrees celcius! </p>
                </div>
            ))}
        </>
    )
}