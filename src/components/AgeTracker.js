import React, { useState, useEffect } from 'react';

const AgeTracker = () => {
  const [age, setAge] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {


    const calculateAgeAndPercentage = () => {
      // Read DOB from localStorage or set it to August 8, 2001, if not present
      let dob = localStorage.getItem('dob');
      if (!dob || dob === 'null') {
        dob = '2001-08-08T00:00:00.000Z'; // August 8, 2001
        localStorage.setItem('dob', dob);
      }
      const dobDate = new Date(dob);
      const now = new Date();

      // Calculate age in years
      let ageInYears = now.getFullYear() - dobDate.getFullYear();

      // Adjust age if the current date is before the birthday in the current year
      const currentYearBirthday = new Date(now.getFullYear(), dobDate.getMonth(), dobDate.getDate());
      if (now < currentYearBirthday) {
        ageInYears--;
      }

      setAge(ageInYears.toFixed(0));

      // Calculate the percentage based on the elapsed time since the last birthday
      let lastBirthday = new Date(now.getFullYear(), dobDate.getMonth(), dobDate.getDate());
      if (now < lastBirthday) {
        lastBirthday = new Date(now.getFullYear() - 1, dobDate.getMonth(), dobDate.getDate());
      }
      const elapsedMilliseconds = now - lastBirthday;
      const elapsedSeconds = elapsedMilliseconds / 1000;
      const secondsInYear = 31536000; // 31536000 seconds in a year

      // Calculate percentage with 8 decimal places
      const percentageElapsed = (elapsedSeconds / secondsInYear);
      setPercentage(percentageElapsed.toFixed(8));
    };

    // Calculate age and percentage immediately
    calculateAgeAndPercentage();

    // Set up a timer to update age and percentage every second
    const intervalId = setInterval(calculateAgeAndPercentage, 50);

    // Cleanup by clearing the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-3xl font-semibold text-center mt-8">
      <span>{age}.</span>
      <span className="text-xl font-normal">{percentage.toString().substring(2).padStart(8, '0')}</span>
    </div>
  );
};

export default AgeTracker;
