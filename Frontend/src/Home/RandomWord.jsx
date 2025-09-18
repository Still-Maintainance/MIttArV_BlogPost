import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'

// Large word list
const words = [
    "Inspire", "Create", "Imagine", "Explore", "Innovate", "Discover", "Connect",
    "Illuminate", "Evolve", "Vision", "Achieve", "Courage", "Harmony", "Brilliance",
    "Serenity", "Wisdom", "Freedom", "Passion", "Adventure", "Gratitude", "Hope",
    "Focus", "Empathy", "Balance", "Joy", "Curiosity", "Clarity", "Resilience",
    "Kindness", "Optimism", "Integrity", "Motivate", "Energy", "Creativity", "Learning"
];

const RandomWord = () => {
    const [word, setWord] = useState("");
    const [res, setRes] = useState(null);

    const generateWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    useEffect(() => {
        const newWord = generateWord();
        setWord(newWord);

        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`)
            .then((response) => {
                setRes(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching dictionary data:", error);
                setRes(null);
            });
    }, []);

    if (!res) return <p className="text-center mt-6 text-gray-500">Loading...</p>;

    const phonetic = res.phonetic || (res.phonetics && res.phonetics[0]?.text);
    const meaning = res.meanings?.[0];
    const definition = meaning?.definitions?.[0]?.definition;
    const example = meaning?.definitions?.[0]?.example;
    

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}          
            whileInView={{ opacity: 1, y: 0 }}        
            viewport={{ once: true, amount: 0.3 }}   
            transition={{ duration: 0.6, ease: "easeOut" }} 
        >
            <div className="flex justify-center mt-6">
                <p className="font-playfair font-semibold text-5xl">Random Word</p>
            </div>
            <div className="flex  font-playfair justify-center mt-8 mb-24">
                <div className="bg-white rounded-xl p-8 max-w-3xl w-full border border-gray-200 flex flex-col md:flex-row gap-6">

                    {/* Left Column: Word + Phonetic */}
                    <div className="flex-1 flex flex-col p-8 items-center md:items-start justify-center border-r border-gray-200 pr-4">
                        <h2 className="text-5xl font-playfair font-bold mb-2">{word}</h2>
                        {phonetic && <p className="text-gray-500 italic">/{phonetic}/</p>}
                    </div>  

                    {/* Right Column: Definitions and others */}
                    <div className="flex-2 flex flex-col p-5 justify-start">
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-1">Definition:</h3>
                            <p className="text-gray-800">{definition || "No definition found."}</p>
                        </div>

                        {example && (
                            <div className="mb-4">
                                <h3 className="font-bold text-lg mb-1">Example:</h3>
                                <p className="text-gray-800 italic">"{example}"</p>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RandomWord;
