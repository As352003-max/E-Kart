import React, { useEffect } from 'react';

const MessageModal = ({ message, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center animate-fade-in">
        <p className="text-xl font-semibold text-gray-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
