export default function Loader({ label = "Growing..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl animate-bounce">🌱</div>
      <p className="mt-4 text-leaf-700 font-medium">{label}</p>
    </div>
  );
}