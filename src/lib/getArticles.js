import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getArticles() {
  const snapshot = await getDocs(collection(db, "test"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
