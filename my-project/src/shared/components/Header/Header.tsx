import { Box } from "@mui/material"

const HeaderBG = () => {
  return (
    <Box sx={{
      bgcolor:"#121214",
      height: "200px",
      padding: "2rem"
    }} >

    </Box>
  )
}

export const Header = () => {
  return (
    <HeaderBG/>
  )
}