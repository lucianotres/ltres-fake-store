const formatarDecimal = (valor: number, casas = 2): string =>
  valor.toLocaleString(undefined, {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });

export { formatarDecimal };