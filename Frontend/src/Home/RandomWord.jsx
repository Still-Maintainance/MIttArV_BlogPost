import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

// Large word list
const words = [
    "Inspire", "Create", "Imagine", "Explore", "Innovate", "Discover", "Connect",
    "Illuminate", "Evolve", "Vision", "Achieve", "Courage", "Harmony", "Brilliance",
    "Serenity", "Wisdom", "Freedom", "Passion", "Adventure", "Gratitude", "Hope",
    "Focus", "Empathy", "Balance", "Joy", "Curiosity", "Clarity", "Resilience",
    "Kindness", "Optimism", "Integrity", "Motivate", "Energy", "Creativity", "Learning",
    "Alacrity", "Ambrosial", "Aplomb", "Beleaguer", "Benevolent", "Cadence",
    "Camaraderie", "Celerity", "Chiaroscuro", "Composure", "Convivial", "Corpulent",
    "Cryptic", "Debonair", "Desideratum", "Diaphanous", "Ebullient", "Ethereal",
    "Ephemeral", "Equanimity", "Esoteric", "Euphoria", "Exuberance", "Felicity",
    "Gossamer", "Halcyon", "Harbinger", "Impetuous", "Ineffable", "Inimitable",
    "Insouciance", "Intrepid", "Iridescent", "Luminous", "Lugubrious", "Mellifluous",
    "Munificent", "Nefarious", "Nirvana", "Obfuscate", "Obsequious", "Opulent",
    "Panacea", "Paragon", "Pernicious", "Perspicacity", "Plethora", "Propitious",
    "Quintessential", "Rapport", "Recalcitrant", "Redolent", "Resplendent", "Sagacious",
    "Sanguine", "Serendipity", "Soliloquy", "Somnolent", "Spurious", "Stentorian",
    "Supercilious", "Supine", "Surreptitious", "Taciturn", "Tantamount", "Tenacious",
    "Transcendent", "Ubiquitous", "Umbrage", "Unctuous", "Veneration", "Vicissitude",
    "Vindicate", "Virtuoso", "Vivacious", "Voracious", "Whimsical", "Zenith", "Zephyr",
    "Aegis", "Anachronism", "Antediluvian", "Apocryphal", "Assiduous", "Bilious",
    "Bucolic", "Cacophony", "Conflagration", "Demure", "Diatribe", "Ebullience",
    "Effervescent", "Egregious", "Epiphany", "Eschew", "Exemplar", "Farrago", "Furtive"
];

const RandomWord = () => {
    const [word, setWord] = useState("");
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    useEffect(() => {
        const fetchWord = async () => {
            try {
                setLoading(true);
                setError(null);
                const newWord = generateWord();
                setWord(newWord);

                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`, {
                    timeout: 5000, // 5 second timeout
                });

                if (response.data && response.data.length > 0) {
                    setRes(response.data[0]);
                    setError(null);
                } else {
                    throw new Error("No data returned");
                }
            } catch (error) {
                console.error("Error fetching dictionary data:", error.message);

                // Fallback: Create a simple definition from the word itself
                const simpleDefinition = {
                    word: word || "Word",
                    meanings: [{
                        definitions: [{
                            definition: `A word of interest. "${word}" carries meaning in various contexts.`,
                            example: "This word is part of our ongoing vocabulary building journey."
                        }]
                    }]
                };

                setRes(simpleDefinition);
                setError("Could not fetch definition. Showing generated definition.");
            } finally {
                setLoading(false);
            }
        };

        fetchWord();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center mt-6">
                <p className="text-center text-gray-500 font-playfair">Loading word of inspiration...</p>
            </div>
        );
    }

    const phonetic = res?.phonetic || (res?.phonetics && res.phonetics[0]?.text);
    const meaning = res?.meanings?.[0];
    const definition = meaning?.definitions?.[0]?.definition;
    const example = meaning?.definitions?.[0]?.example;


    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex justify-center mt-6 px-4">
                <p className="font-playfair font-semibold text-3xl sm:text-4xl md:text-5xl text-center">Improve Your Vocab</p>
            </div>
            <div className="flex font-playfair justify-center mt-8 mb-24 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl p-6 sm:p-8 max-w-3xl w-full border border-gray-200 flex flex-col md:flex-row gap-6">

                    {/* Error Message */}
                    {error && (
                        <div className="w-full mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">{error}</p>
                        </div>
                    )}

                    {/* Left Column: Word + Phonetic */}
                    <div className="flex-1 flex flex-col p-4 sm:p-8 items-center md:items-start justify-center border-b md:border-r md:border-b-0 border-gray-200">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-2 text-center md:text-left">{word}</h2>
                        {phonetic && <p className="text-sm sm:text-base text-gray-500 italic">/{phonetic}/</p>}
                    </div>

                    {/* Right Column: Definitions and others */}
                    <div className="flex-1 flex flex-col p-4 sm:p-5 justify-start">
                        <div className="mb-4">
                            <h3 className="font-bold text-base sm:text-lg mb-1">Definition:</h3>
                            <p className="text-sm sm:text-base text-gray-800">{definition || "No definition found."}</p>
                        </div>

                        {example && (
                            <div className="mb-4">
                                <h3 className="font-bold text-base sm:text-lg mb-1">Example:</h3>
                                <p className="text-sm sm:text-base text-gray-800 italic">"{example}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
    );
};

export default RandomWord;