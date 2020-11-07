import React, { useState } from "react";
import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

import { InputLabel, InputGroup } from "../comune/input";

const DatePicker = ({ dates, setStartDate, setEndDate }) => {
  const [focused, set_focused] = useState({
    checkIn: null,
    chceckOut: null
  });

  return (
    <Container>
      <InputGroup>
        <InputLabel htmlFor="start_date">check-in</InputLabel>
        <DivStart>
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
        </DivStart>
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor="end_date">check-out</InputLabel>
        <DivEnd>
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
        </DivEnd>
      </InputGroup>
    </Container>
  );
};

export default DatePicker;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DivStart = styled.div`
  border-radius: 0.3rem 0 0 0.3rem;
  border: 1px solid #d8d8d8;

  &:active,
  &:focus {
    border: #00a699 1px solid;
  }
`;

const DivEnd = styled.div`
  border-radius: 0 0.3rem 0.3rem 0;
  border: 1px solid #d8d8d8;
`;
