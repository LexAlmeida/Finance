import { Box } from "@mui/material";
import { MyCard } from "./MyCards";
import { formatarPreco, getUltimaData } from "../../services/utils";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

export const Cards = () => {
  const { resumoDados, transacoesCompletas } = useContext(FinanceContext);

  const cards = [
    {
      title: "Entrada",
      value: formatarPreco(resumoDados.entradas),
      icon: "arrowUp" as const,
      isHighlight: false,
      lastTransaction: getUltimaData(transacoesCompletas, "entrada"),
    },
    {
      title: "Saída",
      value: formatarPreco(resumoDados.saidas),
      icon: "arrowDown" as const,
      isHighlight: false,
      lastTransaction: getUltimaData(transacoesCompletas, "saida"),
    },
    {
      title: "Total",
      value: formatarPreco(resumoDados.total),
      icon: "money" as const,
      isHighlight: true,
      lastTransaction: getUltimaData(transacoesCompletas),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: { xs: -10, sm: -5 },
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": { height: "4px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          background: "#4b5263",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": { background: "#00b37e" },
        justifyContent: { xs: "flex-start", sm: "space-between" },

        "&::after": {
          content: '""',
          width: { xs: "1px", sm: 0 },
          flexShrink: 0,
        },
      }}
    >
      {cards.map((card: any) => (
        <MyCard key={card.title} {...card} />
      ))}
    </Box>
  );
};
