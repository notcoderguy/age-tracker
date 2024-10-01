import React, { useState } from 'react';
import './DatePicker.css';
import './components/Calendar.css';
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
        <a href='https://github.com/notcoderguy/age-tracker' target='_blank' className={`text-${isDarkMode ? 'white' : 'gray-600'} hover:text-${isDarkMode ? 'gray-300' : 'gray-800'} focus:outline-none`} aria-label='github' rel='noopener noreferrer'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </a>

      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="DatePicker Modal"
        className={`modal ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        overlayClassName="modal-overlay"
      >

        <p className={`text-2xl font-semibold mb-4 text-white`}>Select your DOB</p>

        {/* Date picker with improved styles */}
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          className={`bg-black text-white border rounded w-full`}
          dayPlaceholder='dd'
          monthPlaceholder='mm'
          yearPlaceholder='yyyy'
          format='dd/MM/yyyy'
        />
      </Modal>

      {/* Text in the middle of the screen */}
      <AgeTracker />
    </div>
  );
}

export default App;
