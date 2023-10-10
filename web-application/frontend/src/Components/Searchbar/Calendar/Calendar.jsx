import { isDate } from "date-fns";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calendar = (props) => {
  const startingDate = new Date();
  startingDate.setMonth(startingDate.getMonth()-1);
  const lastDate = new Date();
  lastDate.setDate(lastDate.getDate());

  

  const [selectedDate, setSelectedDate] = useState(lastDate);

  // if(props.date) props.date(selectedDate.getDate)

  const isDateSelectable = (date) => {
    return date >= startingDate && date <= lastDate;
  };
  return (
    <div class='border-2 border-discordBlue p-2 cursor-pointer'>
      <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={startingDate}
      maxDate={lastDate}
      filterDate={isDateSelectable}
      class='focus:border-white p-2'
    />
    </div>
  );
};

export default Calendar