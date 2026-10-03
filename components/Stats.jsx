import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <div data-stats className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-10 md:pb-10">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:gap-x-10">
        {stats.map(({ value, label }) => (
          <div key={label} data-stat data-hide className="flex flex-col-reverse border-t border-line pt-3">
            <dt className="mt-1 text-sm text-mute">{label}</dt>
            <dd className="text-3xl font-semibold tabular-nums tracking-tight md:text-5xl">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mx-auto mt-4 max-w-[1400px] text-xs text-mute">Placeholder figures for demonstration.</p>
    </div>
  );
}
