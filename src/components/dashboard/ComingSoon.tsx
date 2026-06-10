export function ComingSoon({
  module,
  description,
}: {
  module: string;
  description?: string;
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-10 flex flex-col items-center text-center gap-4">
      <div className="text-4xl">🚧</div>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Coming soon
      </span>
      <div>
        <p className="text-lg font-semibold text-gray-900">{module}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <p className="text-sm text-gray-400">This dashboard will be built in a later phase.</p>
    </div>
  );
}
