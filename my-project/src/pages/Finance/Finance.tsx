import { Cards } from "../../shared/components/Cards/Cards";
import { BoxPrincipal } from "../../shared/components/Box/Box";
import { Search } from "../../shared/components/Inputs/Search";
import { TabelaTransacoes } from "../../shared/components/Tabela/Tabela";


export const Finance = () => {
    return (
        <BoxPrincipal>
            <Cards/>
            <Search/>
            <TabelaTransacoes/>
        </BoxPrincipal>     
    )
}