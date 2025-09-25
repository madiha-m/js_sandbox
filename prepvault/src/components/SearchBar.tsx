import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  showBookmarks: boolean;
  setShowBookmarks: (val: boolean) => void;
  onNew: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  showBookmarks,
  setShowBookmarks,
  onNew,
  onExport,
  onImport,
}) => {
  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Search questions/tags..."
        className="border rounded p-2 flex-1"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={onNew}>
        + New
      </button>
      <button className="bg-gray-200 px-3 py-2 rounded" onClick={onExport}>
        Export JSON
      </button>
      <label className="bg-gray-200 px-3 py-2 rounded cursor-pointer">
        Import JSON
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={e => e.target.files?.[0] && onImport(e.target.files[0])}
        />
      </label>
      <button
        className={`px-3 py-2 rounded ${showBookmarks ? "bg-yellow-400" : "bg-gray-200"}`}
        onClick={() => setShowBookmarks(!showBookmarks)}
      >
        {showBookmarks ? "Show All" : "Bookmarks"}
      </button>
    </div>
  );
};

export default SearchBar;
