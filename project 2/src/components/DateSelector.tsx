import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const years = Array.from({ length: 31 }, (_, i) => new Date().getFullYear() + i);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-2xl mb-6 text-purple-200 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Select Your Future Date
      </label>
      <div className="w-full max-w-xs mx-auto">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          minDate={new Date()}
          placeholderText="Choose a date..."
          className="w-full"
          wrapperClassName="w-full"
          showPopperArrow={false}
          dateFormat="MMMM d, yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={30}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className="p-1 hover:bg-purple-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-purple-200 flex items-center justify-center w-8 h-8"
              >
                ←
              </button>

              <div className="flex gap-3">
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(Number(value))}
                  className="bg-purple-800/50 text-purple-200 rounded-lg px-3 py-1 cursor-pointer hover:bg-purple-700/50 transition-colors border border-purple-500/30"
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                  className="bg-purple-800/50 text-purple-200 rounded-lg px-3 py-1 cursor-pointer hover:bg-purple-700/50 transition-colors border border-purple-500/30"
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className="p-1 hover:bg-purple-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-purple-200 flex items-center justify-center w-8 h-8"
              >
                →
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}