import DarkModeToggle from "@/components/darkModeToggle";

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-gray-300 bg-gray-50 py-7 text-center text-sm text-gray-400 dark:border-neutral-700 dark:bg-[#1A1A1A]">
      <div>Viafoura - Copyright © {new Date().getFullYear()}</div>
      <DarkModeToggle />
    </footer>
  );
}
