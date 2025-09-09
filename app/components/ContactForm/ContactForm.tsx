"use client";

import { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format pesan untuk WhatsApp
    const message = `Halo Althaf! 👋

Saya ingin menghubungi Anda mengenai project/kolaborasi.

*Nama:* ${formData.name}
*Email:* ${formData.email}
*Pesan:*
${formData.message}

Terima kasih! 🙏`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL dengan nomor dan pesan
    const whatsappUrl = `https://wa.me/6281556442718?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
    
    // Reset form setelah submit
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="group">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="contoh@email.com"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="group">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
            Pesan
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex pointer-events-none">
              <FaComment className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Ceritakan tentang project atau ide kolaborasi Anda..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                <span>Kirim ke WhatsApp</span>
              </>
            )}
          </div>
        </button>
        
        <p className="text-sm text-gray-400 text-center">
          Pesan akan dikirim melalui WhatsApp dan akan langsung terhubung dengan saya
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
