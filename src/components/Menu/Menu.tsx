import { LayoutGrid } from "lucide-react";

type MenuProps = {
  name: string;
};

export const Menu = ({ name }: MenuProps) => {
  return (
    <button
      className="flex items-center group p-2 px-2 sm:px-4 gap-2 hover:bg-neutral-100 rounded-md user-focus"
      aria-label={`Abrir menu de ${name}`}
      aria-expanded="false" // Atualize conforme necessário
      aria-controls="menu-options" // ID do menu que o botão controla
    >
      <LayoutGrid
        size={24}
        className="animate-fade-down animate-once group-hover:-rotate-90 transition-all"
      />
      <span className="text-sm text-neutral-700 hidden sm:flex">{name}</span>
    </button>
  );
};
