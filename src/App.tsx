import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle, X, Plus, Trash2 } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  createdAt: number;
}

const services = [
  { id: 'consultation', name: 'Consultation', duration: '30 min', price: '$75' },
  { id: 'treatment', name: 'Full Treatment', duration: '60 min', price: '$150' },
  { id: 'premium', name: 'Premium Experience', duration: '90 min', price: '$225' },
  { id: 'vip', name: 'VIP Session', duration: '120 min', price: '$350' },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
];

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
  });

  // Load bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...formData,
      createdAt: Date.now(),
    };
    setBookings([...bookings, newBooking]);
    setFormData({ name: '', email: '', service: '', date: '', time: '' });
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const isTimeBooked = (date: string, time: string) => {
    return bookings.some(b => b.date === date && b.time === time);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] relative overflow-hidden" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#2D4A3E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#C4A77D]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="w-16 h-[1px] bg-[#2D4A3E]/30 mx-auto mb-6" />
            <span className="text-[#C4A77D] tracking-[0.3em] uppercase text-xs font-medium">
              Reserve Your Moment
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl text-[#2D4A3E] mb-4 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The Booking
          </h1>
          <p className="text-[#5A6B5D] text-lg max-w-md mx-auto leading-relaxed">
            A sanctuary for your appointments. Schedule with intention.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - New Booking */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2D4A3E]/10 shadow-xl shadow-[#2D4A3E]/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#2D4A3E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>New Reservation</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(!showForm)}
                  className="w-12 h-12 rounded-full bg-[#2D4A3E] text-[#F5F1EB] flex items-center justify-center shadow-lg shadow-[#2D4A3E]/20"
                >
                  <motion.div
                    animate={{ rotate: showForm ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={24} />
                  </motion.div>
                </motion.button>
              </div>

              <AnimatePresence>
                {showForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-6 overflow-hidden"
                  >
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-[#5A6B5D] text-sm tracking-wide uppercase">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A77D]" size={18} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-[#F5F1EB]/50 border border-[#2D4A3E]/10 rounded-xl text-[#2D4A3E] placeholder-[#5A6B5D]/50 focus:outline-none focus:border-[#C4A77D] transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-[#5A6B5D] text-sm tracking-wide uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 bg-[#F5F1EB]/50 border border-[#2D4A3E]/10 rounded-xl text-[#2D4A3E] placeholder-[#5A6B5D]/50 focus:outline-none focus:border-[#C4A77D] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                      <label className="text-[#5A6B5D] text-sm tracking-wide uppercase">
                        Select Service
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {services.map((service) => (
                          <motion.button
                            key={service.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, service: service.id })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              formData.service === service.id
                                ? 'bg-[#2D4A3E] text-[#F5F1EB] border-[#2D4A3E]'
                                : 'bg-[#F5F1EB]/50 text-[#2D4A3E] border-[#2D4A3E]/10 hover:border-[#C4A77D]'
                            }`}
                          >
                            <div className="font-medium">{service.name}</div>
                            <div className={`text-sm mt-1 ${
                              formData.service === service.id ? 'text-[#C4A77D]' : 'text-[#5A6B5D]'
                            }`}>
                              {service.duration} · {service.price}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Date Field */}
                    <div className="space-y-2">
                      <label className="text-[#5A6B5D] text-sm tracking-wide uppercase">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A77D]" size={18} />
                        <input
                          type="date"
                          required
                          min={getMinDate()}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                          className="w-full pl-12 pr-4 py-4 bg-[#F5F1EB]/50 border border-[#2D4A3E]/10 rounded-xl text-[#2D4A3E] focus:outline-none focus:border-[#C4A77D] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time Slots */}
                    {formData.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-[#5A6B5D] text-sm tracking-wide uppercase flex items-center gap-2">
                          <Clock size={14} />
                          Available Times
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => {
                            const booked = isTimeBooked(formData.date, time);
                            return (
                              <motion.button
                                key={time}
                                type="button"
                                disabled={booked}
                                whileHover={!booked ? { scale: 1.05 } : {}}
                                whileTap={!booked ? { scale: 0.95 } : {}}
                                onClick={() => !booked && setFormData({ ...formData, time })}
                                className={`py-3 rounded-lg text-sm font-medium transition-all ${
                                  booked
                                    ? 'bg-[#F5F1EB]/30 text-[#5A6B5D]/40 cursor-not-allowed line-through'
                                    : formData.time === time
                                    ? 'bg-[#C4A77D] text-white'
                                    : 'bg-[#F5F1EB]/50 text-[#2D4A3E] hover:bg-[#C4A77D]/20'
                                }`}
                              >
                                {time}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={!formData.name || !formData.email || !formData.service || !formData.date || !formData.time}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#2D4A3E] to-[#3D5A4E] text-[#F5F1EB] rounded-xl font-medium tracking-wide shadow-lg shadow-[#2D4A3E]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      Confirm Reservation
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {!showForm && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#5A6B5D] text-center py-8"
                >
                  Click the + button to create a new reservation
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Right Column - Bookings List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#2D4A3E]/10 shadow-xl shadow-[#2D4A3E]/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#2D4A3E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your Reservations</h2>
                <span className="px-3 py-1 bg-[#C4A77D]/20 text-[#C4A77D] rounded-full text-sm font-medium">
                  {bookings.length} booked
                </span>
              </div>

              {bookings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5F1EB] flex items-center justify-center">
                    <Calendar className="text-[#C4A77D]" size={32} />
                  </div>
                  <p className="text-[#5A6B5D]">No reservations yet</p>
                  <p className="text-[#5A6B5D]/60 text-sm mt-1">Your upcoming appointments will appear here</p>
                </motion.div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {bookings
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="group relative p-5 bg-[#F5F1EB]/50 rounded-xl border border-[#2D4A3E]/5 hover:border-[#C4A77D]/30 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-medium text-[#2D4A3E]">{booking.name}</h3>
                              <p className="text-sm text-[#5A6B5D]">{booking.email}</p>
                              <div className="flex items-center gap-4 text-sm flex-wrap">
                                <span className="px-2 py-1 bg-[#2D4A3E]/10 text-[#2D4A3E] rounded">
                                  {services.find(s => s.id === booking.service)?.name}
                                </span>
                                <span className="text-[#C4A77D] flex items-center gap-1">
                                  <Calendar size={14} />
                                  {new Date(booking.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span className="text-[#5A6B5D] flex items-center gap-1">
                                  <Clock size={14} />
                                  {booking.time}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteBooking(booking.id)}
                              className="opacity-0 group-hover:opacity-100 p-2 text-[#5A6B5D] hover:text-red-500 transition-all"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="w-16 h-[1px] bg-[#2D4A3E]/20 mx-auto mb-4" />
          <p className="text-[#5A6B5D]/50 text-xs tracking-wide">
            Requested by @wenxora · Built by @clonkbot
          </p>
        </motion.footer>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-[#2D4A3E] text-[#F5F1EB] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="text-[#C4A77D]" size={20} />
            <span>Reservation confirmed successfully!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-2 hover:opacity-70">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C4A77D40;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C4A77D60;
        }
      `}</style>
    </div>
  );
}

export default App;
