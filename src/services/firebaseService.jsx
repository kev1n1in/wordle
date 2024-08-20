import { db } from "./firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

export async function fetchSolution() {
  const querySnapshot = await getDocs(collection(db, "solutions"));

  if (!querySnapshot.empty) {
    const solutions = querySnapshot.docs.map((doc) => doc.data().solution);
    const randomIndex = Math.floor(Math.random() * solutions.length);
    const selectedSolution = solutions[randomIndex];
    console.log("Selected solution:", selectedSolution);

    return selectedSolution;
  }
  return;
}
