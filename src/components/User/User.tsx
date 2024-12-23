import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IconButton } from "../IconButton";

export const User = () => {
  return (
    <div
      className="border border-neutral-200 hover:bg-neutral-100 inline-flex items-center rounded-md gap-2 p-2"
      aria-label="Abrir menu do usuário"
      aria-expanded="false"
      aria-controls="user-menu"
    >
      <Image
        src="/images/avatar-placeholder.png"
        className="rounded-full border-neutral-200 border"
        width={40}
        height={40}
        alt="Avatar do usuário"
        title="Avatar do usuário"
      />
      <div className="hidden sm:flex flex-col items-start">
        <h1 className="text-sm text-neutral-700" role="text">
          Nome do usuário
        </h1>
        <span className="text-xs text-neutral-500" role="text">
          Organização
        </span>
      </div>
      <IconButton aria-hidden="true" size={"small"}>
        <ChevronDown size={18} />
      </IconButton>
    </div>
  );
};
