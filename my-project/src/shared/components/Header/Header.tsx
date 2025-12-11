import { Box } from "@mui/material"
import React from "react"
import { NewButton } from "../Button/Button"

interface IHeader {
  children: React.ReactNode
}

const HeaderBG = ({children}: IHeader) => {
  return (
    <Box sx={{
      bgcolor:"#121214",
      height: "225px",
      padding: "0 150px 70px 150px",
    }}
    display="flex"
    alignItems="center"
    justifyContent="space-between" >
      {children}
    </Box>
  )
}

const Image = () => {
  return (
    <img
    src="/logo.png"
    alt="logo"
    width="200px"/>
  )
}

export const Header = () => {
  return (
    <HeaderBG>
      <Image/>
      <NewButton/>
    </HeaderBG>
  )
}