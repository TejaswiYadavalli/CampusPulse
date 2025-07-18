import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 text-white text-center">
      {/* Social Media Icons */}
      <motion.div
        className="flex justify-center gap-10 mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
          <motion.div
            key={idx}
            className="text-2xl hover:scale-125 hover:text-blue-400 transition-transform cursor-pointer"
            whileHover={{ rotate: 5 }}
            animate={{
              y: [0, -4, 0],
              transition: { repeat: Infinity, duration: 2, delay: idx * 0.2 },
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Information */}
      <div className="mb-8">
        <p className="text-lg">Get in Touch</p>
        <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:justify-center md:gap-8">
          <motion.div
            className="flex items-center gap-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaEnvelope className="text-xl" />
            <span>campusepulse@gmail.com</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaPhoneAlt className="text-xl" />
            <span>+91 9876543210</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaMapMarkerAlt className="text-xl" />
            <span>Idupulapaya, YSR Dist, A.P - 516330</span>
          </motion.div>
        </div>
      </div>

      {/* Additional Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-blue-400">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Mission & Vision
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-blue-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-blue-400">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Community
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        &copy; 2025{" "}
        <span className="text-blue-400 font-semibold">Campus Pulse</span>. All
        Rights Reserved.
      </p>
    </footer>
  );
}
