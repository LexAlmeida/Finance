import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
    const IconComponent = IconMap[icon]
    return (
        <Card sx={{flexGrow: 1}}>
        <Grid spacing={2}>
            <Grid size={3}>
                <Typography variant="h6">{title}</Typography>
                <IconComponent/>
            </Grid>
            <Typography variant="h4">{value}</Typography>
        </Grid>
        </Card>
    )
}

export const Finance = () => {
    return (
        <Box sx={{width:'100%'}}>
            <Stack direction='row' spacing={2}>
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