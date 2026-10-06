export default function Footer() {
  return (
    <footer className=" bg-leaf-800 text-leaf-100 py-3">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg">🌿 PlantConnect — Making India greener, one pot at a time 🌿</p>
        <p className="text-sm text-leaf-300 mt-2">© {new Date().getFullYear()} PlantConnect</p>
      </div>
    </footer>
  );
}