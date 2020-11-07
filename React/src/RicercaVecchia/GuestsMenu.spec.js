import { stringify } from "./GuestsMenu.logic";

test("guests are the sum of adults and children", () => {
  const result = stringify({ adults: 3, children: 2, infants: 0 });
  expect(result).toEqual("5 guests");
});
