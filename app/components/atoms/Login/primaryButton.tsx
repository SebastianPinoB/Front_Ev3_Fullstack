import { Button } from "antd";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
  return (
    <Button
      type="primary"
      block
      onClick={onClick}
      htmlType="submit"
      className="h-12 rounded-lg font-bold bg-primary hover:bg-primary/90"
    >
      {text}
    </Button>
  );
}