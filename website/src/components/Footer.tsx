const Footer = () => {
  return (
    <footer className="w-full py-8 bg-footer border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <span className="text-heading-md text-white">
            Pageant Wagon
          </span>

          {/* Copyright */}
          <p className="text-caption text-gray-500">
            &copy; {new Date().getFullYear()} Pageant Wagon. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
