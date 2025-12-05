import { ButtonNew } from "../Button/Button";
import { Cards } from "../Cards/Cards";
import { DivPrincipal } from "../Div/Div";
import { Search } from "../Inputs/Search";


export const Finance = () => {
    return (
        <DivPrincipal>
            <ButtonNew/>
            <Cards/>
            <Search/>
        </DivPrincipal>     
    )
}