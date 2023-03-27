'use client'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; 
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Link from 'next/link'

export default function page() {
  const [data, setData] = useState('');
  const [definition, setDefinition] = useState('');
  const [phonetic, setPhonetic] = useState('');

  const pathname = usePathname();
  const path = pathname.split('/')[2];
  // const date = path.split('-');
  const date = new Date();
  // const [day, setDay] = useState(date.getDate());
  let day = date.getDate()

  async function getData() {
    const docRef = doc(db, 'words', `${path}-en`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setData(docSnap.data().word);
    } else {
      console.log('No such document!');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    async function getDefinition() {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`
        ); // Use the "data" state to fetch the word dynamically
        const json = await res.json();
        console.log(json);
        // setDefinition(json[0].meanings[0].definitions[0].definition);
        setDefinition(json[0].meanings[0].definitions[0].definition);
        setPhonetic(json[0].phonetics[1].text);
      } catch (error) {
        console.log(error);
      }
    }

    if (data) {
      getDefinition();
    }
  }, [data]); // Trigger the effect whenever the "data" state changes

  return (
    <div>
      {/* <p onClick={() => {}}>&lt;</p> */}
      <Link className="mx-5" href={`/wod/${day--}-${date.getMonth() + 1}-${date.getFullYear()}`}>&lt;</Link>
      <p>&gt;</p>
      <p>Path: {path}</p>
      <p>Word: {data && data}</p>
      <p>Definition: {definition}</p>
      <p>Phonetic: {phonetic}</p>
    </div>
  );
}
