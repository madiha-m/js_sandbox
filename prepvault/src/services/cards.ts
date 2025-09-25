import { cardsCollection } from "../firebase";
import type { Card } from "../types"
import { addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

// Add a new card
export const addCard = async (card: Card) => {
    await addDoc(cardsCollection, card);
};

// Update a card
export const updateCard = async (id: string, data: Partial<Card>) => {
    const docRef = doc(cardsCollection, id);
    await updateDoc(docRef, data);
};

// Delete a card
export const deleteCardById = async (id: string) => {
    const docRef = doc(cardsCollection, id);
    await deleteDoc(docRef);
};

// Get all cards
export const getAllCards = async (): Promise<Card[]> => {
    const snapshot = await getDocs(cardsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Card));
};
