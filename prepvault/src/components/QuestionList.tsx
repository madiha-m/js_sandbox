import React from "react";
import ReactMarkdown from "react-markdown";
import type { Card } from "../types";

interface QuestionListProps {
  cards: Card[];
  toggleBookmark: (card: Card) => void;
  setEditing: (card: Card) => void;
  deleteCard: (id: string) => void;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const QuestionList: React.FC<QuestionListProps> = ({
  cards,
  toggleBookmark,
  setEditing,
  deleteCard,
  setCards,
}) => {
  return (
    <ul className="space-y-2">
      {cards.map(card => (
        <li key={card.id} className="bg-white p-3 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <button
                className="text-left font-medium"
                onClick={() =>
                  setCards(cards.map(c => (c.id === card.id ? { ...c, open: !c.open } : c)))
                }
              >
                {card.question}
              </button>
              <div className="text-xs text-gray-500">{card.tags.join(", ")}</div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => toggleBookmark(card)}>{card.bookmarked ? "★" : "☆"}</button>
              <button onClick={() => setEditing(card)}>Edit</button>
              <button className="text-red-600" onClick={() => deleteCard(card.id)}>
                Del
              </button>
            </div>
          </div>

          {card.open && (
            <div className="mt-2 border-l-2 pl-3 text-sm prose max-w-none">
              <ReactMarkdown>{card.answer}</ReactMarkdown>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;
