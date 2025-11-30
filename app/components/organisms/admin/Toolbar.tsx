import Button from "~/components/atoms/Admin/Button";

interface ToolbarProps {
  onAdd: () => void;
}

export default function Toolbar({ onAdd }: ToolbarProps) {
  return (
    <div className="flex justify-end mb-6">
      <Button onClick={onAdd}>
        + Añadir Libro
      </Button>
    </div>
  );
}
