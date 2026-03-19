import { Box } from "@mui/material";
import React from "react";
import { NewButton } from "../Button";

interface IHeader {
  children: React.ReactNode;
}

const HeaderBG = ({ children }: IHeader) => {
  return (
    <Box
      sx={{
        bgcolor: "#121214",
        height: { xs: "160px", sm: "200px" },
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: { xs: "32px", sm: "40px" },
      }}
      component="header"
    >
      {children}
    </Box>
  );
};

const Logo = () => {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt="logo"
      sx={{
        width: "auto",
        maxWidth: { xs: "130px", sm: "170px", md: "200px" },
        height: "auto",
        display: "block",
      }}
    />
  );
};

export const Header = ({
  carregarTransacoes,
}: {
  carregarTransacoes: () => void;
}) => {
  return (
    <HeaderBG>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: { xs: "95%", md: "80%" },
          mx: "auto",   
          px: { xs: 2.5, sm:3.5,md: 0 },                     
        }}
      >
        <Logo />
        <NewButton carregarTransacoes={carregarTransacoes} />
      </Box>
    </HeaderBG>
  );
};
