export default function TagSkeleton({ index = 0 }) {
  return (
    <div
      className="relative animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="absolute -top-4 left-6 flex flex-col items-center z-10 opacity-40">
        <div className="tag-string" />
        <div className="tag-hole" />
      </div>
      <div className="bg-paper border border-line rounded-[4px] shadow-tag overflow-hidden">
        <div className="skeleton w-full aspect-[4/3]" />
        <div className="p-4 border-t border-dashed border-line space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="flex justify-between">
            <div className="skeleton h-5 w-16 rounded" />
            <div className="skeleton h-3 w-20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
