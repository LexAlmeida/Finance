import type { ITransacao } from "../components/Tabela";

export const getUltimaData = (transacoes: ITransacao[], tipo?: 'entrada'|'saida') => {
    const filtradas = tipo ? transacoes.filter(t => t.tipo === tipo) : transacoes;

    if(filtradas.length === 0) return tipo ? `Nenhuma ${tipo} registrada` : 'Sem transações registradas';

    const ultimaTransacao = filtradas.reduce((latest, current) => {
        return new Date(current.data) > new Date(latest.data) ? current : latest;
    });

    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long'
    }).format(new Date(ultimaTransacao.data));

    if(!tipo) return `Última atualização em ${dataFormatada}`

    return `Última ${tipo} em ${dataFormatada}`
}

export const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL'
    }).format(preco)
}