// frontend/app/calendar/new/page.js
'use client'; // 👈 Required for components that use hooks like useState

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SchedulerView() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Schedule A Class</h1>

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
