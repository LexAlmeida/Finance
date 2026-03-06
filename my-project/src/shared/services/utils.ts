import type { ITransacao } from "../components/Tabela";

export const getUltimaData = (transacoes: ITransacao[], tipo: 'entrada'|'saida') => {
    const filtradas = transacoes.filter(t => t.tipo === tipo);

    if(filtradas.length === 0) return `Nenhuma ${tipo} registrada`;

    const ultimaTransacao = filtradas.reduce((latest, current) => {
        return new Date(current.data) > new Date(latest.data) ? current : latest;
    });

    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long'
    }).format(new Date(ultimaTransacao.data))

    return `Última ${tipo} em ${dataFormatada}`
}