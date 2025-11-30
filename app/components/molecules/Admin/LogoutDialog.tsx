import Button from "~/components/atoms/Admin/Button";
import ModalBackdrop from "~/components/atoms/Admin/ModalBackdrop";

export default function LogoutDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ModalBackdrop onClick={onCancel} />

      <div className="relative bg-white w-full max-w-sm p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          ¿Seguro que quieres cerrar sesión?
        </h2>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Sí, salir
          </Button>
        </div>
      </div>
    </div>
  );
}
