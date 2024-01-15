import React, { useState } from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';

import Modal from './components/Modal';

import ThemeToggle from './components/ThemeToggle';
import Settings from './components/Settings';
import AgeTracker from './components/AgeTracker';


function App() {
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const initialTheme = localStorage.getItem('theme') || getSystemTheme();
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('dob', date);
    closeModal();
  };

  const handleOpenDatePicker = () => {
    openModal(); // Open the modal when the settings icon is clicked
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
      {/* Icons in the top-right corner */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Settings isDarkMode={isDarkMode} onOpenDatePicker={handleOpenDatePicker} />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="DatePicker Modal"
        className={`modal ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        overlayClassName="modal-overlay"
      >
        {/* Text within the modal */}
        <p className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-black' : 'text-black'}`}>Select your DOB</p>

        {/* Date picker with improved styles */}
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          className={`bg-gray-200 text-black`}
          dayPlaceholder='08'
          monthPlaceholder='08'
          yearPlaceholder='2001'
        />
      </Modal>

      {/* Text in the middle of the screen */}
      <AgeTracker />
    </div>
  );
}

export default App;
