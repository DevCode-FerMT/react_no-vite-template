import './App.css'
import { useState, useEffect } from "react";

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function App() {
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data;
                setFact(fact);
            })
    }, [])

    useEffect(() => {
        if (!fact) return;
        const threeFirstWords = fact.split(' ', 3).join(' ');

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(res => {
                const { url } = res;
                setImageUrl(url)
            })
    }, [fact])

    return (
        <main>
            <h1>Curiosidades de gatos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} />}
        </main>
    )
}