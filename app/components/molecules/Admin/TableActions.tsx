import React from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TableActions({ onEdit, onDelete }: Props) {
  return (
    <div className="text-right space-x-2">
      <button
        className="p-2 text-blue-600 hover:text-blue-800"
        onClick={onEdit}
      >
        ✏️
      </button>

      <button
        className="p-2 text-red-600 hover:text-red-800"
        onClick={onDelete}
      >
        🗑️
      </button>
    </div>
  );
}
