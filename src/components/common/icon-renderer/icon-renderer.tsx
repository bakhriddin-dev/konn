import { iconOptions } from "@/constants/icons";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className }) => {
  const option = iconOptions.find((opt) => opt.value === iconName);

  if (!option) return null;

  const IconComponent = option.Icon;

  return <IconComponent className={className} />;
};
