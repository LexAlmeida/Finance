import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Theme } from "../../themes/Theme";
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

interface ICard {
    title: string;
    value: string;
    icon: string;
}

const IconMap: {[key: string]: React.ElementType} = {
    arrowUp: ArrowCircleUpIcon,
    arrowDown: ArrowCircleDownIcon,
    money: AttachMoneyIcon
}

const MyCard = ({title, value, icon}: ICard) => {
    const IconComponent = IconMap[icon];
    const theme = Theme;
    return (
            <Box sx={{
                display: 'flex', 
                justifyContent: 'center', 
                gap: 3, 
                mt: 2}} 
                color={theme.palette.text.primary}>
                <Card sx={{width:390, borderRadius: "6px"}}>
                    <Grid container spacing={2} direction='column' p={4}>
                        <Box display={"flex"} justifyContent='space-between'>
                            <Typography variant="h6">{title}</Typography>
                            <IconComponent/>
                        </Box>
                        <Typography variant="h4">{value}</Typography>
                    </Grid>
                </Card>
            </Box> 
    )
}

export const Cards = () => {
    return (
        <Box sx={{width:'100%', marginTop:"-90px", maxWidth: "1120px"}}>
            <Stack direction='row' spacing={2} justifyContent='center' gap={2}>
                <MyCard
                    title="Entrada"
                    value="4444,22"
                    icon="arrowUp"/>
                <MyCard
                    title="Saída"
                    value="4444,22"
                    icon="arrowDown"/>
                <MyCard 
                    title="Total"
                    value="4444,22"
                    icon="money"/>
            </Stack>
        </Box>
    )
}