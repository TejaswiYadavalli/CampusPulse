import { useEffect, useState } from 'react';

export default function AdminEventManager() {
  const [form, setForm] = useState({ title: '', date: '', location: '' });
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
        credentials: 'include',
      });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
  ? `${process.env.REACT_APP_BACKEND_URL}/events/${editingId}`
  : `${process.env.REACT_APP_BACKEND_URL}/events`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      setForm({ title: '', date: '', location: '' });
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      setMessage('Error submitting event');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, { method: 'DELETE' });
      setMessage('Event deleted');
      fetchEvents();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (event) => {
    setForm({ title: event.title, date: event.date, location: event.location });
    setEditingId(event._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Admin Event Manager</h2>
        {message && (
          <div className="text-center text-sm font-medium text-green-600 bg-green-100 p-2 rounded">
            {message}
          </div>
        )}

        {/* Event Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="location"
            placeholder="Event Location"
            value={form.location}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              {editingId ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>

        {/* Event Table */}
        <div>
          <h3 className="text-2xl font-semibold text-black mb-4">Existing Events</h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full table-auto text-left border-collapse">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Location</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-black">
                      No events available
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border text-black">{event.title}</td>
                      <td className="p-3 border text-black">{event.date}</td>
                      <td className="p-3 border text-black">{event.location}</td>
                      <td className="p-3 border text-center space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
