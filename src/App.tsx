import { useEffect, useMemo, useState } from "react";
import { useSortByDesc } from "./hooks/useSortByDesc";
import { Stack } from "@mui/joy";
import { CurrencyEnum, Ticket } from "./types";
import AirlineCard from "./components/AirlineCard/AirlineCard";
import FilterBlock from "./components/FilterBlock/FilterBlock";
import apiService from "./services/apiService";
import { StopsProps } from "./components/FilterBlock/FilterBlockProps";

function App() {
  const [tickets, setTickets] = useState([]);
  const [currencyRate, setCurrencyRate] = useState({
    EUR: 0.0099996716,
    USD: 0.0106455347,
    RUB: 1,
  });
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.RUB);
  const [checkbox, setCheckbox] = useState(["all"]);

  const currencyConverter = (price: number, rate: number) =>
    Math.round(price * rate);

  const handleCurrencyChange = (value: CurrencyEnum) => {
    setCurrency(value);
  };

  const handleCheckboxChange = (value: StopsProps["value"][]) => {
    setCheckbox(value);
  };

  useEffect(() => {
    const fetchCurrencyRate = async () => {
      try {
        const data = await apiService.getLatestCurrency();
        setCurrencyRate(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrencyRate();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsData = await apiService.getTickets();
        setTickets(ticketsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTickets();
  }, []);

  const checkedTickets = useMemo(() => {
    if (checkbox.includes("all")) {
      return tickets;
    } else {
      return tickets.filter((ticket: Ticket) =>
        checkbox.includes(ticket.stops.toString()),
      );
    }
  }, [checkbox, tickets]);

  const sortedTickets = useSortByDesc(checkedTickets);

  return (
    <div className="container app">
      <FilterBlock
        onCurrencyChange={handleCurrencyChange}
        onCheckboxChange={handleCheckboxChange}
      />
      <Stack>
        {sortedTickets.map((ticket: Ticket) => (
          <AirlineCard
            key={`${ticket.departure_time}-${ticket.arrival_time}-${ticket.price}`}
            ticket={{
              ...ticket,
              price: currencyConverter(ticket.price, currencyRate[currency]),
            }}
            currency={currency}
          />
        ))}
      </Stack>
    </div>
  );
}

export default App;
