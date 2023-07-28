import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <ul className="flex items-center justify-between space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
