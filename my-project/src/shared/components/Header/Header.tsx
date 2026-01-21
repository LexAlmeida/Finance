import { Box } from "@mui/material"
import React from "react"
import { NewButton } from "../Button/Button"

const MAX_CONTENT_WIDTH="1120px"

interface IHeader {
  children: React.ReactNode
}

const HeaderContentBox = ({children}:IHeader) => {
  return (
    <Box sx={{
      width:'100%',
      maxWidth: MAX_CONTENT_WIDTH,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      p:0,
    }}>
      {children}
    </Box>
  )
}

const HeaderBG = ({children}: IHeader) => {
  return (
    <Box sx={{
      bgcolor:"#121214",
      height: "225px",
      padding: {xs:"0 20px 70px 20px",md:"0 150px 70px 150px"},
    }}
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="space-around" >
      {children}
    </Box>
  )
}

const Image = () => {
  return (
    <img
    src="/logo.png"
    alt="logo"
    style={{width:'auto', maxWidth:'200px', maxHeight:'40px'}}/>
  )
}

export const Header = ({carregarTransacoes}: {carregarTransacoes: () => void}) => {
  return (
    
    <HeaderBG>
      <HeaderContentBox>
        <Image/>
        <NewButton carregarTransacoes={carregarTransacoes}/>
      </HeaderContentBox>
    </HeaderBG>
)
}