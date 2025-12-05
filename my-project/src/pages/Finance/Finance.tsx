import { ButtonNew } from "../../shared/components/Button/Button";
import { Cards } from "../../shared/components/Cards/Cards";
import { DivPrincipal } from "../../shared/components/Box/Box";
import { Search } from "../../shared/components/Inputs/Search";


export const Finance = () => {
    return (
        <DivPrincipal>
            <ButtonNew/>
            <Cards/>
            <Search/>
        </DivPrincipal>     
    )
}