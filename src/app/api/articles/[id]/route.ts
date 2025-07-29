
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// This API route fetches a single article from the Firestore database.
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, 'articles', params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      return new NextResponse('Article not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// This API route updates a single article in the Firestore database.
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content } = await request.json();
    const docRef = doc(db, 'articles', params.id);
    await updateDoc(docRef, { title, content });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error updating article:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// This API route deletes a single article from the Firestore database.
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, 'articles', params.id);
    await deleteDoc(docRef);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting article:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
