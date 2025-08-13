export function TeamSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; name: string }[];
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          block w-full
          px-4 py-2
          bg-white border border-gray-300
          rounded-lg shadow-sm
          text-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="">Select a team</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
