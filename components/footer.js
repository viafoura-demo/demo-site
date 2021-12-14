import Alert from "@/components/alert";

export default function Footer(preview) {
  return (
    <footer className="text-sm text-center text-gray-400 border-t border-gray-300 py-7 bg-gray-50 mt-14">
      <Alert preview={preview} />
      <div>Viafoura - Copyright © {new Date().getFullYear()}</div>
    </footer>
  );
}
