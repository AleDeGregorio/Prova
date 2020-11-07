import React, { useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import "./ProvaRicerca.css"

import { InputLabel, InputGroup } from "../comune/input";

const DatePicker = ({ dates, setStartDate, setEndDate }) => {
  const [focused, set_focused] = useState({
    checkIn: null,
    chceckOut: null
  });

  return (
    <div className="row contenitoreDate">
        <InputLabel htmlFor="start_date">check-in</InputLabel>
  
          <SingleDatePicker
            date={dates.startDate}
            onDateChange={date => setStartDate(date)}
            focused={focused.checkIn}
            onFocusChange={({ focused }) =>
              set_focused({
                ...focused,
                checkIn: focused
              })
            }
            id="start_date"
            numberOfMonths={1}
            placeholder="mm/dd/yyyy"
            daySize={32}
            hideKeyboardShortcutsPanel={true}
            displayFormat="ddd, MMM DD"
            block={true}
            verticalSpacing={8}
            showClearDate={focused.checkIn}
            reopenPickerOnClearDate={true}
            noBorder={true}
          />
        <InputLabel htmlFor="end_date">check-out</InputLabel>
   
          <SingleDatePicker
            date={dates.endDate}
            onDateChange={date => setEndDate(date)}
            focused={focused.checkOut}
            onFocusChange={({ focused }) =>
              set_focused({
                ...focused,
                checkOut: focused
              })
            }
            id="end_date"
            numberOfMonths={1}
            placeholder="mm/dd/yyyy"
            daySize={32}
            hideKeyboardShortcutsPanel={true}
            displayFormat="ddd, MMM DD"
            block={true}
            isDayHighlighted={day =>
              day.isAfter(dates.startDate) && day.isBefore(dates.endDate)
            }
            verticalSpacing={8}
            anchorDirection="right"
            isDayBlocked={day => day.isBefore(dates.startDate)}
            showClearDate={focused.checkOut}
            reopenPickerOnClearDate={true}
            noBorder={true}
          />
        </div>
  );
};

export default DatePicker;


