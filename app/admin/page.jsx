'use client'
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [date, setDate] = useState('')
    const [word, setWord] = useState('')
    const [error, setError] = useState('')
    const definition = useWordDefinition(word);

    async function fetchDefinition(word) {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Failed to fetch word definition:', error);
        return null;
      }
    }

    function useWordDefinition(word) {
      const [definition, setDefinition] = useState('');

      useEffect(() => {
        async function getWordDefinition() {
          const data = await fetchDefinition(word);
          setDefinition(data);
        }

        if (word) {
          getWordDefinition();
        } else {
          setDefinition(null);
        }
      }, [word]);

      return definition;
    }

    // useEffect(() => {
    //   if (user?.email !== "golitsynnick@gmail.com") router.push("/")
    // }, [user])

    const handleForm = async (e) => {
      let error = null
      let results = null
      e.preventDefault()
      try {
        console.log('trying to add word');
        let results = await setDoc(doc(db, "words", date.split('-').reverse().join('-') + '-en'), {
          word: word,
        });
        console.log(results);
        console.log('finished trying');
      } catch (e) {
        console.log('error');
        console.log(e);
        error = e
      }
      return { error, results }
    }

    if (error) {
      setError(error)
      return console.log(error);
    }

    return (
      <>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="date" className="mb-4 block w-96">
            <p className="text-lg mb-1">Date</p>
            <input 
              onChange={(e) => setDate(e.target.value)} 
              required 
              type="date" 
              name="date" 
              id="date" 
              placeholder="Date" 
              className="!px-4 !py-3 !w-64 !rounded-md border !border-customGrey focus:outline-none !bg-fff"
            />
          </label>
          <label htmlFor="word" className="mb-4 block w-96">
            <p className="text-lg mb-1">Word</p>
            <input 
              onChange={(e) => setWord(e.target.value)} 
              required 
              type="text" 
              name="word" 
              id="word" 
              placeholder="Word" 
              className="px-4 py-3 w-64 rounded-md border border-customGrey focus:outline-none"
            />
          </label>
          <button type="submit" className="bg-customGrey text-customWhite mb-4 py-3 px-4 rounded-md hover:bg-opacity-80">
            Submit
          </button>
        </form>
        {definition && definition.length > 0 ? (
          <div>
            <h2>Definition of {word}:</h2>
            <ul>
              {definition.map((entry, index) => (
                <li key={index}>{entry.meanings[0].definitions[0].definition}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No definition found for {word}.</p>
        )}
      </>
    );
}

export default Page;