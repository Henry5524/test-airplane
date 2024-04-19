import { useEffect, useState } from "react";
import { Button, ButtonGroup, Checkbox, Stack, Typography } from "@mui/joy";
import {
  CurrencyProps,
  FilterBlockProps,
  StopsProps,
  currencyData,
} from "./FilterBlockProps";
import { CurrencyEnum } from "../../types";
import apiService from "../../services/apiService";

export default function FilterBlock({
  onCurrencyChange,
  onCheckboxChange,
}: FilterBlockProps) {
  const [setActiveCurrency, setsetActiveCurrency] = useState<string>(
    CurrencyEnum.RUB,
  );
  const [allChecked, setAllChecked] = useState({
    value: "all",
    isChecked: false,
  });
  const [stops, setStops] = useState<StopsProps[]>([]);

  const handleChangeCurrency = (value: CurrencyEnum) => {
    setsetActiveCurrency(value);
    onCurrencyChange?.(value);
  };

  const handleChangeStops = (e: {
    target: { value: StopsProps["value"]; checked: boolean };
  }) => {
    const itemValue = e.target.value;
    const checked = e.target.checked;

    if (itemValue !== "all") {
      stops.map((item: StopsProps) =>
        item.value === itemValue ? (item.completed = checked) : item,
      );
      setStops([...stops]);
      setAllChecked({
        ...allChecked,
        isChecked: stops.every((item: StopsProps) => item.completed),
      });
      onCheckboxChange?.(
        stops
          .filter((item: StopsProps) => item.completed === true)
          .map((item: StopsProps) => item.value),
      );
    } else {
      setAllChecked({ ...allChecked, isChecked: checked });
      stops.map((item: StopsProps) => (item.completed = checked));
      onCheckboxChange?.(["all"]);
    }
  };

  useEffect(() => {
    const fetchSortByStops = async () => {
      try {
        const stopsData = await apiService.getSortByStopsData();
        setStops(stopsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSortByStops();
  }, []);

  return (
    <Stack
      width={300}
      alignItems="center"
      sx={{
        paddingBlock: 2,
        backgroundColor: "white",
        boxShadow: "0px 0px 3px 0px rgba(12, 113, 224, 0.3)",
        borderRadius: "10px",
      }}
    >
      <Stack width={250}>
        <Typography
          level="h4"
          sx={{
            textTransform: "uppercase",
            textAlign: "left",
            mb: 1,
            color: "#0B072A",
          }}
        >
          Валюта
        </Typography>

        <ButtonGroup sx={{ margin: "auto", mb: 4 }}>
          {currencyData.map((item: CurrencyProps) => (
            <Button
              key={item.id}
              onClick={() => handleChangeCurrency(item.value)}
              variant="soft"
              size="lg"
              sx={{
                border: "1px solid #0C71E0",
                outline: "none",
                backgroundColor:
                  item.value === setActiveCurrency ? "#0C71E0" : "white",
                color: item.value === setActiveCurrency ? "white" : "#0C71E0",
                ":hover": {
                  background: "#0C71E0, 0.12",
                  color: "white",
                  border: "1px solid #0C71E0 ",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

      <Stack width={260}>
        <Typography
          level="h4"
          sx={{
            textTransform: "uppercase",
            textAlign: "left",
            mb: 1,
            color: "#0B072A",
          }}
        >
          Количество пересадок
        </Typography>

        <Stack flexDirection="column" alignItems="left" gap={1}>
          <Checkbox
            checked={allChecked.isChecked}
            value={allChecked.value}
            onChange={handleChangeStops}
            label="Все"
            slotProps={{
              label: ({ checked }) => ({
                sx: {
                  fontSize: "md",
                  color: checked ? "#454156" : "#7B8096",
                },
              }),
            }}
          />
          {stops.map((item: StopsProps) => {
            return (
              <Stack key={`${item.id}-${item.value}`}>
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  value={item.value}
                  onChange={handleChangeStops}
                  label={item.title}
                  slotProps={{
                    label: ({ checked }) => ({
                      sx: {
                        fontSize: "md",
                        color: checked ? "#454156" : "#7B8096",
                      },
                    }),
                  }}
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
