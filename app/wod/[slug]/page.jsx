'use client'
import { use, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Link from 'next/link'

export default function page() {
  const [data, setData] = useState('');

  const [definition, setDefinition] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [def, setDef] = useState('');
  const [audio, setAudio] = useState(null);

  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split('/')[2];
  const pathDate = path.split('-');
  const date = new Date();
  // const dateDay = ('0' + date[0]).slice(-2)
  // const dateMonth = ('0' + date[1]).slice(-2)
  // const dateYear = date.getFullYear()
  // const [day, setDay] = useState(date.getDate());
  // let day = date.getDate()
  // const [day, setDay] = useState(new Date().getDate());
  const [day, setDay] = useState(27);
  const [input, setInput] = useState(`${pathDate[2]}-${pathDate[1]}-${pathDate[0]}`);

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
    // console.log(`${dateYear}-${dateMonth}-${dateDay}`);
    getData();
  }, []);

  useEffect(() => {
    async function getDefinition() {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`
        );
        const json = await res.json();
        console.log(json);
        setDefinition(json[0].meanings[0].definitions[0].definition);
        setPhonetic(json[0].phonetics[1].text);
        setDef(json[0].meanings);
        if (json[0].phonetics[0].audio) {
          setAudio(new Audio(json[0].phonetics[0].audio));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (data) {
      getDefinition();
    }
  }, [data]);

  const handleDateClicked = (event) => {
    const selectedDate = event.target.value;
    const pushDate = selectedDate.split('-').reverse().join('-');
    router.push(`/wod/${pushDate}`);
  }

  const start = () => {
    console.log(audio.src);
    if (audio) {
      audio.play();
    }
  }

  return (
    <div>
      <h2 className='text-2xl'>Word Of The Day</h2>
      <input  
        type="date" 
        inputMode='none' 
        value={input} 
        onChange={handleDateClicked} 
        min="2023-03-20" 
        max={`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`}
      />
      <h3 className='text-4xl'>{data && data.toUpperCase()}</h3>
      {audio && <button onClick={start}>Play</button>}
      <p>{phonetic && phonetic}</p>
      <p>Definition:</p>
      <ol>{def && def.map((e) => (
        <>{e.definitions.map((e) => (
          <li key="{e.definition}">{e.definition}</li>
        ))}</>
      ))}</ol>
    </div>
  );
}
