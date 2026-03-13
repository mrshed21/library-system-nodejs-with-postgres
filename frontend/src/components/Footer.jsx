// src/components/Footer.jsx
const Footer = () => {
  return (
    <div className="bg-white w-full  mx-auto dark:bg-gray-900 dark:text-gray-300  border-t border-gray-200 dark:border-gray-800">
      <footer className="bg-white w-full max-w-7xl mx-auto dark:bg-gray-900 dark:text-gray-300  border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <p> © footer</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-400">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-400">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
