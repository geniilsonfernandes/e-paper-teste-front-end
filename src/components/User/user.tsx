import { ChevronDown } from "lucide-react";
import Image from "next/image";

export const User = () => {
  return (
    <button
      className="border border-neutral-200 hover:bg-neutral-100 inline-flex items-center rounded-md gap-2 p-2 focus:outline focus:outline-2 focus:outline-black"
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
      />
      <div className="hidden sm:flex flex-col items-start">
        <h1 className="text-sm text-neutral-700" role="text">
          Nome do usuário
        </h1>
        <span className="text-xs text-neutral-500" role="text">
          Organização
        </span>
      </div>
      <span className="w-8 h-8 center" aria-hidden="true">
        <ChevronDown size={16} />
      </span>
    </button>
  );
};
