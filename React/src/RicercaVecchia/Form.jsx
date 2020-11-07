import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { Bottone } from "../comune/Bottone";

import SearchInput from "./SearchInput";
import DatePicker from "./DatePicker";
const FormComp = () => {
  const [place, set_place] = useState("");
  const [dates, set_dates] = useState({
    startDate: moment(),
    endDate: null
  });
  // const [guests, set_guests] = useState({
  //   guests: 0,
  //   infants: 0
  // });

  const setPlace = e => {
    set_place(e.target.value);
  };

  const setStartDate = startDate => {
    set_dates({
      ...dates,
      startDate
    });
  };

  const setEndDate = endDate => {
    set_dates({
      ...dates,
      endDate
    });
  };

  return (
    <FormContainer>
      <Form>
        <SearchInput place={place} setPlace={setPlace} />
        <DatePicker
          dates={dates}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          set_dates={set_dates}
        />
        <ButtonBox>
          <Bottone>Search</Bottone>
        </ButtonBox>
      </Form>
    </FormContainer>
  );
};

export default FormComp;

const FormContainer = styled.div`
`;

const Form = styled.form`
  width: 100%;
  padding: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
