import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <footer className="app-footer flex items-center justify-center gap-2 filter grayscale">
      <Logo />
      <p className="text-sm text-neutral-600">Copyright © 2024 e-paper</p>
    </footer>
  );
};
