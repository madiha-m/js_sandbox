import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Card } from "../types";

interface EditorProps {
  card: Card;
  onSave: (q: string, a: string, tags: string[]) => void;
  onCancel: () => void;
}

const Editor: React.FC<EditorProps> = ({ card, onSave, onCancel }) => {
  const [q, setQ] = useState(card.question || "");
  const [a, setA] = useState(card.answer || "");
  const [tags, setTags] = useState((card.tags || []).join(", "));

  // Reset fields when a new card is selected
  useEffect(() => {
    setQ(card.question || "");
    setA(card.answer || "");
    setTags((card.tags || []).join(", "));
  }, [card]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{card.id ? "Edit Q&A" : "New Q&A"}</h2>
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Question"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2 rounded h-32"
        placeholder="Answer (Markdown supported)"
        value={a}
        onChange={e => setA(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => {
            onSave(q, a, tags.split(",").map(t => t.trim()).filter(Boolean));
            // Reset fields if creating new
            if (!card.id) {
              setQ("");
              setA("");
              setTags("");
            }
          }}
        >
          Save
        </button>
        <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Preview</h4>
        <div className="prose max-w-none border p-2 rounded">
          <ReactMarkdown>{a || "_Nothing yet_"}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Editor;
