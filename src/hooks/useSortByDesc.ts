import { Ticket } from "../types";

export const useSortByDesc = (tickets: Ticket[]) => {
  const compareTickets = (a: Ticket, b: Ticket) => {
    return b.stops - a.stops;
  };

  return [...tickets].sort(compareTickets);
};
