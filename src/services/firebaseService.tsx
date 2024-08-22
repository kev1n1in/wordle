import { getDocs, collection, Firestore } from "firebase/firestore";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export async function fetchSolution(
  db: Firestore
): Promise<string | undefined> {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "solutions")
  );

  if (!querySnapshot.empty) {
    const solutions = querySnapshot.docs.map((doc) => doc.data().solution);
    const randomIndex = Math.floor(Math.random() * solutions.length);
    const selectedSolution = solutions[randomIndex];
    return selectedSolution;
  }
  return undefined;
}
