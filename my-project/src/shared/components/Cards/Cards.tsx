import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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
    return (
        <Card sx={{
            width:{xs: '100%', sm: '27.5rem'}, 
            borderRadius: "6px",
            mb: {xs:2, sm:0}}}>
            <Grid container spacing={2} direction='column' p={4}>
                <Box display={"flex"} justifyContent='space-between'>
                    <Typography variant="h6">{title}</Typography>
                    <IconComponent/>
                </Box>
                <Typography variant="h4">{value}</Typography>
            </Grid>
        </Card>
    )
}

export const Cards = () => {
    return (
        <Box sx={{width:'100%', margin:{xs:'20px auto 0 auto',sm:'-90px auto 0 auto'},  maxWidth: "1120px", padding:{xs:2,sm:0}}}>
            <Stack direction='row' spacing={{xs:0,sm:2}} justifyContent='center' gap={2}>
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