export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-4xl mx-auto px-4 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} John Jeong
      </div>
    </footer>
  );
}
