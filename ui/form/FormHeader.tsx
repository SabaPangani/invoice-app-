export default function FormHeader({ name }: { name: string }) {
  return (
    <h3 className="font-bold text-primary col-span-2 self-start md:col-span-3">
      {name}
    </h3>
  );
}
