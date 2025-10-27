import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="bg-blue-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">
                Rozgar Darpan
              </span>
            </Link>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded-md transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Rozgar Darpan - MGNREGA Data Portal
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
