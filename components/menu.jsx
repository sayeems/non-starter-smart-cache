import Link from "next/link";
export default function Menu() {
  return (
    <div className="prose pt-2 mx-auto">
      <h1 className="text-center text-teal-600">
        <Link href="/" className="text-teal-600">
          HOME
        </Link>
      </h1>
    </div>
  );
}
