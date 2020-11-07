import React, { useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

import { InputLabel, InputGroup } from "../comune/input";
import { Dropdown } from "react-bootstrap";




const DatePicker = ({ dates, setStartDate, setEndDate }) => {
    const [focused, set_focused] = useState({
      checkIn: null,
      chceckOut: null
    });

    return(
      
        <div className="col">
        <div className="col">
        <label>Check-in</label>
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
            placeholder="DD/MM/YYYY"
            daySize={32}
            hideKeyboardShortcutsPanel={true}
            displayFormat="DD/MM/YYYY"
            block={true}
            reopenPickerOnClearDate={true}
            noBorder={true}
          />
          </div>
          <div className="col">
          <label>Check-out</label>
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
            placeholder="DD/MM/YYYY"
            daySize={32}
            hideKeyboardShortcutsPanel={true}
            displayFormat="DD/MM/YYYY"
            block={true}
            isDayHighlighted={day =>
              day.isAfter(dates.startDate) && day.isBefore(dates.endDate)
            }
            verticalSpacing={8}
            anchorDirection="right"
            isDayBlocked={day => day.isBefore(dates.startDate)}
            reopenPickerOnClearDate={true}
            noBorder={true}
          />
          </div>
          </div>
          
          
    );
}
export default DatePicker;