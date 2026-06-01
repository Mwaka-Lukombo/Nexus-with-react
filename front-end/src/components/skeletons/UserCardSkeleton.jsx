export function UserCardSkeleton() {
  return (
    <div className="bg-white border border-[rgb(114,16,17)] rounded-2xl p-5 flex flex-col items-center text-center shadow-md">
      
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-4"></div>

      {/* Nome */}
      <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse mb-2"></div>

      {/* Curso */}
      <div className="h-3 w-24 bg-gray-200 rounded-md animate-pulse mb-4"></div>

      {/* Botão */}
      <div className="h-8 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>
  );
}