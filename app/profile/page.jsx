'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuthContext } from '@/context/AuthContext';

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [words, setWords] = useState([]);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user is logged in
      // Replace this with your authentication logic
      if (!user) {
        router.push('/signin'); // Redirect to sign-in page if not logged in
      } else {

        try {
          const savedWordsRef = collection(db, 'saved_words');
          const savedWordsQuery = query(savedWordsRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(savedWordsQuery);

          const words = querySnapshot.docs.map((doc) => doc.data().word);
          setWords(words);
        } catch (error) {
          console.error('Error retrieving saved words:', error);
        }
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <div>
      {user?.displayName && <h1 className="text-4xl font-bold mb-5">{user?.displayName}</h1>}
      {!user?.displayName && <h1 className="text-4xl font-bold mb-5">{user?.email}</h1>}
      <div>
        {words.length > 0 ? (
          <ul>
            {words.map((word) => (
              <li key={word}>{word.toUpperCase()}</li>
            ))}
          </ul>
        ) : (
          <p>No saved words found.</p>
        )}
      </div>
    </div>
  );
}
