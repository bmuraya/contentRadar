type StatsCardProps = {
  title: string;
  value: string;
  description: string;
};

export default function StatsCard({
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border p-5">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>

      <p className="text-xs text-zinc-500">
        {description}
      </p>
    </div>
  );
}