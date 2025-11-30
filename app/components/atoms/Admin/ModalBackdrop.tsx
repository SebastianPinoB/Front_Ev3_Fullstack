export default function ModalBackdrop({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute inset-0 bg-black/40"
      onClick={onClick}
    />
  );
}
