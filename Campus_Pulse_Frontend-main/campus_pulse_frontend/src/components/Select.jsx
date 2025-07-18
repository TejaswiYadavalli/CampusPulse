import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

export function Select({ value, onChange, children, placeholder }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-60">
        <Listbox.Button className="flex justify-between items-center w-full p-3 bg-white text-gray-800 rounded-xl border border-gray-300 shadow-lg hover:bg-gray-100 transition">
          <span>{value || placeholder}</span>
          <FaChevronDown className="text-gray-500" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-2 w-full bg-white text-gray-800 rounded-xl shadow-xl border border-gray-300 z-10">
          {children}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export function SelectItem({ value, children }) {
  return (
    <Listbox.Option
      value={value}
      className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition rounded-lg"
    >
      {children}
    </Listbox.Option>
  );
}