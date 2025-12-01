import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
  size?: "small" | "middle" | "large";
};

export default function IconButton({ icon, size = "middle", ...rest }: IconButtonProps) {
  return (
    <Button {...rest} icon={icon} size={size} />
  );
}
