import { ReactNode } from "react";

export const CardCustom: React.FC<{
  title?: string;
  color?: string;
  children: ReactNode;
}> = ({ title, color, children }) => {
  return (
    <div className={`rounded-2xl shadow-md p-6 ${color ?? "bg-white"}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <div className="w-full">{children}</div>
    </div>
  );
};
