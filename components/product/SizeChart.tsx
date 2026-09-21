import { SIZE_GUIDE } from "@/lib/catalog";

export default function SizeChart({
  sizes,
  selected,
}: {
  sizes: string[];
  selected?: string;
}) {
  const rows = SIZE_GUIDE.filter((row) => sizes.includes(row.size));

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full min-w-[540px] text-sm text-center">
        <thead>
          <tr className="text-gray-500 border-b border-burgundy-100">
            <th className="py-2.5 px-2 text-right font-bold">المقاس</th>
            <th className="py-2.5 px-2 font-medium">الصدر</th>
            <th className="py-2.5 px-2 font-medium">الخصر</th>
            <th className="py-2.5 px-2 font-medium">الورك</th>
            <th className="py-2.5 px-2 font-medium">الطول</th>
            <th className="py-2.5 px-2 font-medium">الكم</th>
            <th className="py-2.5 px-2 font-medium">الوزن</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const active = row.size === selected;
            return (
              <tr
                key={row.size}
                className={`border-b border-burgundy-50 ${active ? "bg-burgundy-50 font-bold text-ink" : "text-gray-700"}`}
              >
                <td className="py-2.5 px-2 text-right">{row.size}</td>
                <td className="py-2.5 px-2 tabular-nums">{row.bust}</td>
                <td className="py-2.5 px-2 tabular-nums">{row.waist}</td>
                <td className="py-2.5 px-2 tabular-nums">{row.hip}</td>
                <td className="py-2.5 px-2 tabular-nums">{row.length}</td>
                <td className="py-2.5 px-2 tabular-nums">{row.sleeve}</td>
                <td className="py-2.5 px-2 whitespace-nowrap">{row.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
