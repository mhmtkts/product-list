import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ProductStore
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <ScrollLink
            to="footer-about"
            smooth={true}
            duration={500}
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            About
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 