export interface Cotacao {
  code: string,
  codein: string,
  name?: string,
  high?: number,
  low?: number,
  varbid?: number,
  pctchange?: number,
  bid?: number,
  ask?: number,
  timestamp?: string,
  create_date?: string
}