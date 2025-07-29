
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// This API route fetches all news articles from the Firestore database.
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// This API route adds a new news article to the Firestore database.
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const docRef = await addDoc(collection(db, "articles"), {
      title,
      content,
      createdAt: new Date(),
    });
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error adding article:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
