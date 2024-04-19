import { CurrencyEnum } from "../../types";

export const currencyData: CurrencyProps[] = [
  { id: 1, title: "RUB", value: CurrencyEnum.RUB },
  { id: 2, title: "USD", value: CurrencyEnum.USD },
  { id: 3, title: "EUR", value: CurrencyEnum.EUR },
];

export interface FilterBlockProps {
  onCurrencyChange: (value: CurrencyEnum) => void;
  onCheckboxChange: (value: StopsProps["value"][]) => void;
}

export interface StopsProps {
  id: string;
  title: string;
  value: string;
  completed: boolean;
}

export interface CurrencyProps {
  id: number;
  title: string;
  value: CurrencyEnum;
}