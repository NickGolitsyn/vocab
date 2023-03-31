'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import React from 'react';
import Image from "next/image"

export default function page() {
  const [data, setData] = useState('');

  const [definition, setDefinition] = useState('');
  const [meanings, setMeanings] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [def, setDef] = useState('');
  const [audio, setAudio] = useState(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split('/')[2];
  const [btnDate, setBtndate] = useState(new Date(path.split('-').reverse().join('-')));
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
      setData(docSnap.data().word);
    } else {
      console.log('No such document!');
      router.push('/wod');
    }
  }

  useEffect(() => {
    checkDate();
    getData();
  }, []);

  const checkDate = () => {
    const dateChosen = new Date(path.split('-').reverse().join('-'));
    const today = new Date();
    if (dateChosen > today) {
      console.log('should redirect');
    } else {
      console.log('should not');
    }
    const march20 = new Date('2023-03-20');
    if (dateChosen < march20 || dateChosen > today) {
      router.replace('/wod');
    }
  }
  
  useEffect(() => {
    async function getDefinition() {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`
        );
        const json = await res.json();
        setMeanings(json);
        // setDefinition(json[0].meanings[0].definitions[0].definition);
        if (json[0].phonetics[0].audio) {
          setPhonetic(json[0].phonetics[1].text);
        }
        // setDef(json[0].meanings);
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
    if (audio) {
      audio.play();
    }
  }

  const handleBackClick = () => {
    const newDate = new Date(btnDate.getTime() - 24 * 60 * 60 * 1000);
    setBtndate(newDate);
  };

  const handleForwardClick = () => {
    const newDate = new Date(btnDate.getTime() + 24 * 60 * 60 * 1000);
    setBtndate(newDate);
  };

  const isBackDisabled = btnDate <= new Date('2023-03-24');
  const isForwardDisabled = btnDate >= new Date().getTime() - 24 * 60 * 60 * 1000;

  useEffect(() => {
    const formattedDate = btnDate.toISOString().split('T')[0].split('-').reverse().join('-');
    router.push(`/wod/${formattedDate}`);
  }, [btnDate]);

  return (
    <div>
      <h2 className='text-2xl font-bold'>Word Of The Day</h2>
      <div className='flex'>
        <button onClick={handleBackClick} disabled={isBackDisabled} className="font-black text-2xl">&lt;</button>
        <input  
          type="date" 
          inputMode='none' 
          value={input} 
          onChange={handleDateClicked} 
          min="2023-03-24" 
          max={`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`}
        />
        <button onClick={handleForwardClick} disabled={isForwardDisabled} className="font-black text-2xl">&gt;</button>
      </div>
      <h3 className='text-4xl font-bold'>{data && data.toUpperCase()}</h3>
      <div className='flex gap-5 my-2'>
        {audio && (
          // <button onClick={start}>Play</button>
          <Image 
            onClick={start}
            src="/play.svg"
            width={26}
            height={26} 
            alt={""}
          />
        )}
        <p>{phonetic && phonetic}</p>
      </div>
      <h4 className='text-3xl font-bold'>Definition:</h4>
      {/* <ol>{def && def.map((e, i) => (
        <React.Fragment key={i}>{e.definitions.map((e) => (
          <li key={e.definition}>{e.definition}</li>
        ))}</React.Fragment>
      ))}</ol> */}

      <ol className='ml-2 my-1'>
        {meanings && meanings?.title != 'No Definitions Found' && meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.slice(0, 2).map((def, index) => (
              <React.Fragment key={index}>
                <li>{def.definition}</li>
                {/* {def.example && (
                  <span>
                    <h1>Example :</h1> {def.example}
                  </span>
                )} */}
              </React.Fragment>
            ))
          )
        )}
      </ol>
    </div>
  );
}
