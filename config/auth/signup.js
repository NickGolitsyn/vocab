import firebase_app from "../firebase";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    try {
      // updateProfile(user, {
      //   displayName: displayName
      // })
    } catch (e) {
      error = e;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
// await createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     // Update display name
//     updateProfile(user,{
//       displayName: displayName
//     })
//     .then(() => {
//       console.log("Display name added successfully!");
//     })
//     .catch((error) => {
//       console.log("Error updating display name:", error);
//     });
//   })
//   .catch((error) => {
//     console.log("Error creating user:", error);
//   });
// }