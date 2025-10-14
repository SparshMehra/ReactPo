import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      {/* Contact Information */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-4">
            <FaPhone className="text-2xl text-green-800 dark:text-green-400" />
            <p className="text-lg">+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-2xl text-green-800 dark:text-green-400" />
            <p className="text-lg">info@woodlandconservation.ca</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-2xl text-green-800 dark:text-green-400" />
            <p className="text-lg">Halifax, Nova Scotia</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg">
          © {new Date().getFullYear()} Woodland Conservation Area. All Rights
          Reserved.
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
        <div className="flex justify-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 dark:text-green-400 text-3xl hover:scale-110 transition-transform"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 dark:text-green-400 text-3xl hover:scale-110 transition-transform"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 dark:text-green-400 text-3xl hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
