import { getYear } from "date-fns";

export default function Footer() {
  return (
    <footer className="w-full p-4">
      <p className="text-xs">Copyright {getYear(new Date())} John Jeong</p>
    </footer>
  );
}
