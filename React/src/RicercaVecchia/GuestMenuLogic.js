export const updateLabel = (counters, setCounters, setLabel) => (
    title,
    count
  ) => {
    console.log({ counters, setCounters, setLabel });
    console.log({ title, count });
    //update is a clone of counters with the counter change
    const update = {
      ...counters,
      [title]: count
    };
    ensureAdults(update);
    setCounters(update);
    setLabel(stringify(update));
  };
  
  export const ensureAdults = obj => {
    if ((obj.infants > 0 || obj.children) && obj.adults === 0) {
      obj.adults = 1;
    }
  };
  export const stringify = (adults, children, infants) => {
    let str = "Guests";
    let guests = adults + children;
    if (guests > 0) str = `${guests} guest`;
    if (guests > 1) str += "s";
    if (infants > 0) str += `, ${infants} infant`;
    if (infants > 1) str += "s";
    return str;
  };
  