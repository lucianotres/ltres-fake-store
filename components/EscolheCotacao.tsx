import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { fetchUltimaCotacao } from "@/store/cotacaoSlice";
import minhasCotacoes from "./EscolheCotacao.opcoes";
import styles from "./EscolheCotacao.module.css";
import clsx from "clsx";

const EscolheCotacao: React.FC = () => {
  const { ultimaCotacao, status, erro } = useSelector((state: AppState) => state.cotacao);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (value: string) => {
    var minhaCotacao = minhasCotacoes.find(w => w.para === value);
    if (!minhaCotacao)
      return;

    dispatch(fetchUltimaCotacao({ 
      de: minhaCotacao.de, 
      para: minhaCotacao.para 
    }));
  };

  return <>
    <label className={styles.label} htmlFor="cotacao">Cotação:</label>
    <select id="cotacao" 
      className={clsx("form-select", styles.select)} 
      value={ultimaCotacao?.codein}
      onChange={e => handleSelectChange(e.target.value)}
    >
      <option value="">--Selecione--</option>
      {minhasCotacoes.map(c => (
        <option key={c.para} value={c.para}>{c.nome}</option>
      ))}
    </select>
  </>
};

export default EscolheCotacao;