import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      className="w-full flex justify-between items-center py-4 px-8"
    >
      <div>
        <Link href="/">
          <h3 className="font-bold text-2xl">ECOMMERCE</h3>
        </Link>
      </div>
      <div>
        <ul
          className="flex space-x-4"
        >
          <li className="font-medium">Categories</li>
          <li className="font-medium">Sale</li>
          <li className="font-medium">Clearance</li>
          <li className="font-medium">New stock</li>
          <li className="font-medium">Trending</li>
        </ul>
      </div>
      <div className="flex gap-8">
        <Search />
        <ShoppingCart />
      </div>
    </div>
  );
};

export default Navbar;