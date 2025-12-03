import Button from "~/components/atoms/Admin/Button";
import { useNavigate } from "react-router-dom";


interface ToolbarProps {
  onAdd: () => void;
}

export default function Toolbar({ onAdd }: ToolbarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start mb-6">
      <Button onClick={onAdd}>
        + Añadir Libro
      </Button>
    </div>
  );
}
