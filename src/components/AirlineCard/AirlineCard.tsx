import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CurrencyEnum, Ticket } from "../../types";
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Card,
  CardContent,
  CardOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import getSymbolFromCurrency from "currency-symbol-map";

export interface AirlineCardProps {
  ticket: Ticket;
  currency: CurrencyEnum;
}

export default function AirlineCard({ ticket, currency }: AirlineCardProps) {
  const stopsText = (stops: number) => {
    return stops <= 1 ? `${stops} пересадка` : `${stops} пересадки`;
  };

  return (
    <Card
      orientation="horizontal"
      variant="soft"
      sx={{
        width: 760,
        mb: 2,
        backgroundColor: "white",
        boxShadow: "0px 0px 3px 0px rgba(12, 113, 224, 0.3)",
        borderRadius: "10px",
      }}
    >
      <CardOverflow
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingInline: 2,
        }}
      >
        <AspectRatio ratio="16/9" sx={{ width: 200, mt: 0 }}>
          <img
            src={
              "https://1000logos.net/wp-content/uploads/2020/04/Turkish_Airlines_logo.png"
            }
            style={{ objectFit: "cover" }}
            alt="airline_logo"
          />
        </AspectRatio>
        <Button
          variant="solid"
          sx={{
            color: "white",
            bgcolor: "#FF6e00",
            ":hover": {
              bgcolor: "#FF8124",
            },
          }}
        >
          Купить за {ticket.price}
          {currency && getSymbolFromCurrency(currency)}
        </Button>
      </CardOverflow>

      <Divider sx={{ width: 2 }} />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-evenly",
        }}
      >
        <Stack>
          <Typography level="h1" fontWeight="lg" mb={2}>
            {ticket.departure_time}
          </Typography>
          <Typography level="body-md">
            {ticket.origin}, {ticket.origin_name}
          </Typography>
          <Typography level="body-sm">
            {format(ticket.departure_date, "dd MMM yyyy, eee", { locale: ru })}
          </Typography>
        </Stack>

        <Stack textAlign="center" mt={1}>
          <Typography level="body-sm" margin={0}>
            {stopsText(ticket.stops)}
          </Typography>
          <Stack
            sx={{
              width: 150,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "1px", background: "gray" }} />
            <AirplanemodeActiveIcon
              sx={{ transform: "rotate(90deg)", width: 20, height: 20 }}
            />
          </Stack>
        </Stack>

        <Stack>
          <Typography level="h1" fontWeight="lg" mb={2}>
            {ticket.arrival_time}
          </Typography>
          <Typography level="body-md">
            {ticket.destination}, {ticket.destination_name}
          </Typography>
          <Typography level="body-sm">
            {format(ticket.arrival_date, "dd MMM yyyy, eee", { locale: ru })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
