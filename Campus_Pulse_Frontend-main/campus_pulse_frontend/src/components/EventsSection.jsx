import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
          credentials: 'include', 
        });        const data = await response.json();
        setEvents(data);
        console.log("Fetched events:", data); // Debugging line to check fetched data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="py-24 px-6 flex items-center justify-center">
      <div className="container max-w-7xl flex flex-col md:flex-row">
        {/* Left Section (Accordion) */}
        <div className="md:w-2/3 mb-12 md:mb-0">
          <motion.h2
            className="text-4xl font-extrabold mb-16 text-gray-900"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upcoming Events
          </motion.h2>
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-blue-200 transition-all"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex flex-col justify-center text-left">
                    <div className="text-lg font-semibold text-gray-900">{event.title}</div>
                    <div className={`text-sm ${open === index ? "text-gray-700" : "text-gray-900"}`}>
                      {event.date}
                    </div>
                  </div>
                  <div>
                    {open === index ? (
                      <IoIosArrowUp className="text-gray-500" />
                    ) : (
                      <IoIosArrowDown className="text-gray-500" />
                    )}
                  </div>
                </div>
                {open === index && (
                  <div className="mt-4 text-sm text-gray-500 text-left">
                    <p>{event.location}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="md:w-1/3 flex justify-end items-center"> 
          <motion.img
            src="./robot.gif" 
            alt="Event Image"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
