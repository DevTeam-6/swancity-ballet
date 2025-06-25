'use client'; 

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>

      <div className="max-w-md">
        <label className="block mb-2 font-medium text-lg">Select a date & time:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border rounded"
        />
      </div>
    </main>
  );
}
