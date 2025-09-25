import React, { useEffect, useState } from "react";
import type { Card } from "./types";
import Editor from "./components/Editor";
import SearchBar from "./components/SearchBar";
import QuestionList from "./components/QuestionList";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { addCard, deleteCardById, getAllCards, updateCard } from "./services/cards";

const exportJSON = (cards: Card[]) => {
  const data = JSON.stringify(cards, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prepVault-${dayjs().format("YYYYMMDD-HHmmss")}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const importJSON = async (file: File, setCards: React.Dispatch<React.SetStateAction<Card[]>>) => {
  const text = await file.text();
  try {
    const json: Card[] = JSON.parse(text);
    for (const card of json) {
      if (!card.id) card.id = uuidv4();
      await addCard(card);
    }
    const all = await getAllCards();
    setCards(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  } catch {
    alert("Invalid JSON file");
  }
};


const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [editing, setEditing] = useState<Card | null>(null);
  const [search, setSearch] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    const load = async () => {
      const all = await getAllCards();
      setCards(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    };
    load();
  }, []);

  const saveCard = async (q: string, a: string, tags: string[]) => {
    if (!q || !a) return alert("Add both question and answer");
    if (editing && editing.id) {
      await updateCard(editing.id, {
        question: q,
        answer: a,
        tags,
        updatedAt: new Date().toISOString(),
      });
      setEditing(null);
    } else {
      const newCard: Card = {
        id: uuidv4(),
        question: q,
        answer: a,
        tags,
        bookmarked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [],
      };
      await addCard(newCard);
    }
    const all = await getAllCards();
    setCards(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  };

  const deleteCard = async (id: string) => {
    await deleteCardById(id);
    setCards(cards.filter(c => c.id !== id));
  };

  const toggleBookmark = async (card: Card) => {
    await updateCard(card.id, { bookmarked: !card.bookmarked });
    setCards(cards.map(c => c.id === card.id ? { ...c, bookmarked: !c.bookmarked } : c));
  };

  const filtered = cards.filter(c =>
    (!showBookmarks || c.bookmarked) &&
    (c.question.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">PrepVault 🚀</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
        onNew={() => setEditing({} as Card)}
        onExport={() => exportJSON(cards)}
        onImport={(file) => importJSON(file, setCards)}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Questions</h2>
          {filtered.length === 0 && <p className="text-gray-500">No questions found</p>}
          <QuestionList
            cards={filtered}
            toggleBookmark={toggleBookmark}
            setEditing={setEditing}
            deleteCard={deleteCard}
            setCards={setCards}
          />
        </div>

        <div>
          {editing ? (
            <Editor card={editing} onSave={saveCard} onCancel={() => setEditing(null)} />
          ) : (
            <div className="text-gray-600">Select a question or click + New to add.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
