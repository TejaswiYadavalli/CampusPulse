export function Card({ children }) {
    return (
      <div className="w-80 p-4 bg-white shadow-lg rounded-xl border border-gray-300 hover:shadow-2xl transition">
        {children}
      </div>
    );
  }
  
  export function CardContent({ title, date }) {
    return (
      <div className="p-4 text-gray-800">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">📅 Date: {date}</p>
      </div>
    );
  }
  