import { NewButton } from "../../shared/components/Button/Button";
import { Cards } from "../../shared/components/Cards/Cards";
import { BoxPrincipal } from "../../shared/components/Box/Box";
import { Search } from "../../shared/components/Inputs/Search";


export const Finance = () => {
    return (
        <BoxPrincipal>
            <NewButton/>
            <Cards/>
            <Search/>
        </BoxPrincipal>     
    )
}