const formatarDecimal = (valor: number, casas = 2): string =>
  valor.toLocaleString(undefined, {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });

const formatadorData = new Intl.DateTimeFormat("pt-BR");
const formatarData = (valor: Date): string => 
  formatadorData.format(valor);

export { formatarDecimal, formatarData };