import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';

type PlateForm = {
  obraTitulo: string;
  valorObra: string;
  fonteRecurso: string;
  prazoExecucao: string;
  localizacao: string;
  dimensao: string;
  execucao: string;
  ods: string;
  logoEsquerda: string;
  logoDireita: string;
  exibirBid: boolean;
  exibirFundepar: boolean;
};

const FORM_PATH = '/app/app';
const PREVIEW_PATH = '/app/app/placa';
const STORAGE_KEY = 'secid-placa-form';

const odsMap: Record<string, string> = {
  '1': 'SDG-16.svg',
  '2': 'SDG-2.svg',
  '3': 'SDG-1.svg',
  '4': 'SDG-4.svg',
  '5': 'SDG-3.svg',
  '6': 'SDG-5.svg',
  '7': 'SDG-7.svg',
  '8': 'SDG-8.svg',
  '9': 'SDG-9.svg',
  '10': 'SDG-10.svg',
  '11': 'SDG-11.svg',
  '12': 'SDG-12.svg',
  '13': 'SDG-13.svg',
  '14': 'SDG-14.svg',
  '15': 'SDG-15.svg',
  '16': 'SDG-17.svg'
};

const logoMap: Record<string, string> = Object.fromEntries(
  Array.from({ length: 14 }, (_, index) => [String(index + 1), 'logo-institucional.svg'])
);

const initialState: PlateForm = {
  obraTitulo: 'CONSTRUÇÃO DA DELEGACIA CIDADÃ IIIA',
  valorObra: '',
  fonteRecurso: '',
  prazoExecucao: '',
  localizacao: '',
  dimensao: '',
  execucao: '',
  ods: '1',
  logoEsquerda: '1',
  logoDireita: '1',
  exibirBid: false,
  exibirFundepar: false
};

function readStoredForm(): PlateForm {
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return initialState;
  }

  try {
    return { ...initialState, ...JSON.parse(raw) } as PlateForm;
  } catch {
    return initialState;
  }
}

function toPathname(pathname: string) {
  if (pathname === PREVIEW_PATH) {
    return PREVIEW_PATH;
  }

  return FORM_PATH;
}

function PlatePreview({ form }: { form: PlateForm }) {
  const odsSrc = useMemo(() => odsMap[form.ods] ?? 'SDG-16.svg', [form.ods]);
  const logoEsquerdaSrc = useMemo(() => logoMap[form.logoEsquerda] ?? 'logo-institucional.svg', [form.logoEsquerda]);
  const logoDireitaSrc = useMemo(() => logoMap[form.logoDireita] ?? 'logo-institucional.svg', [form.logoDireita]);

  return (
    <section className="plate-wrap">
      <div className="container">
        <div className="header-banner">PARANÁ EM OBRAS</div>
        <div className="sub-banner">GOVERNO DO ESTADO</div>
      </div>
      <h2 className="title-input">{form.obraTitulo}</h2>
      <footer>
        <img id="img04" alt="Logo institucional esquerda" src={`/${logoEsquerdaSrc}`} />
        {form.exibirBid && <img id="imgBID" src="/logo-bid.svg" alt="Logo BID" />}
        {form.exibirFundepar && <img id="imgFUNDEPAR" src="/logo-fundepar.svg" alt="Logo FUNDEPAR" />}
        <img id="img05" src={`/${odsSrc}`} alt="ODS" />
        <img id="img06" src={`/${logoDireitaSrc}`} alt="Logo institucional direita" />
        <img id="imgbar" src="/separator.svg" alt="Separador" />
        <div id="infoBox1">
          <strong style={{ left: 10, top: 10 }}>VALOR DA OBRA:</strong><span id="p1" className="line-value">{form.valorObra}</span>
          <strong style={{ left: 10, top: 30 }}>FONTE DE RECURSO:</strong><span id="p2" className="line-value">{form.fonteRecurso}</span>
          <strong style={{ left: 10, top: 50 }}>PRAZO DE EXECUÇÃO:</strong><span id="p3" className="line-value">{form.prazoExecucao}</span>
        </div>
        <div id="infoBox2">
          <strong style={{ left: 10, top: 10 }}>LOCALIZAÇÃO:</strong><span id="p31" className="line-value">{form.localizacao}</span>
          <strong style={{ left: 10, top: 30 }}>DIMENSÃO:</strong><span id="p32" className="line-value">{form.dimensao}</span>
          <strong style={{ left: 10, top: 50 }}>EXECUÇÃO:</strong><span id="p33" className="line-value">{form.execucao}</span>
        </div>
      </footer>
    </section>
  );
}

export default function App() {
  const [form, setForm] = useState<PlateForm>(() => readStoredForm());
  const [path, setPath] = useState(() => toPathname(window.location.pathname));

  useEffect(() => {
    if (window.location.pathname !== FORM_PATH && window.location.pathname !== PREVIEW_PATH) {
      window.history.replaceState({}, '', FORM_PATH);
      setPath(FORM_PATH);
    }

    const handlePopState = () => {
      setPath(toPathname(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setField = <K extends keyof PlateForm>(key: K, value: PlateForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const persistAndGo = (nextPath: string, data: PlateForm) => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  const onText =
    (key: Extract<keyof PlateForm, 'obraTitulo' | 'valorObra' | 'fonteRecurso' | 'prazoExecucao' | 'localizacao' | 'dimensao' | 'execucao'>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setField(key, event.target.value);
    };

  const onSelect =
    (key: Extract<keyof PlateForm, 'ods' | 'logoEsquerda' | 'logoDireita'>) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setField(key, event.target.value);
    };

  const onCheckbox =
    (key: Extract<keyof PlateForm, 'exibirBid' | 'exibirFundepar'>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setField(key, event.target.checked);
    };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    persistAndGo(PREVIEW_PATH, form);
  };

  const goToForm = () => {
    persistAndGo(FORM_PATH, form);
  };

  if (path === PREVIEW_PATH) {
    return (
      <div className="page">
        <section className="form-panel actions-panel">
          <h1>Placa personalizada</h1>
          <p>Confira o resultado com os dados enviados no formulário.</p>
          <button type="button" onClick={goToForm}>Voltar para editar dados</button>
        </section>
        <PlatePreview form={form} />
      </div>
    );
  }

  return (
    <div className="page">
      <form className="form-panel" onSubmit={submitForm}>
        <h1>Formulário da Placa SECID</h1>
        <div className="form-grid">
          <Field label="Título da obra"><input value={form.obraTitulo} onChange={onText('obraTitulo')} /></Field>
          <Field label="Valor da obra"><input value={form.valorObra} onChange={onText('valorObra')} placeholder="R$ 0,00" /></Field>
          <Field label="Fonte de recurso"><input value={form.fonteRecurso} onChange={onText('fonteRecurso')} /></Field>
          <Field label="Prazo de execução"><input value={form.prazoExecucao} onChange={onText('prazoExecucao')} /></Field>
          <Field label="Localização"><input value={form.localizacao} onChange={onText('localizacao')} /></Field>
          <Field label="Dimensão"><input value={form.dimensao} onChange={onText('dimensao')} /></Field>
          <Field label="Execução"><input value={form.execucao} onChange={onText('execucao')} /></Field>
          <Field label="ODS">
            <select value={form.ods} onChange={onSelect('ods')}>
              {Array.from({ length: 16 }, (_, index) => String(index + 1)).map((item) => (
                <option key={item} value={item}>ODS {item}</option>
              ))}
            </select>
          </Field>
          <Field label="Logo institucional esquerda">
            <select value={form.logoEsquerda} onChange={onSelect('logoEsquerda')}>
              {Array.from({ length: 14 }, (_, index) => String(index + 1)).map((item) => (
                <option key={item} value={item}>Logo {item}</option>
              ))}
            </select>
          </Field>
          <Field label="Logo institucional direita">
            <select value={form.logoDireita} onChange={onSelect('logoDireita')}>
              {Array.from({ length: 14 }, (_, index) => String(index + 1)).map((item) => (
                <option key={item} value={item}>Logo {item}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="checkbox-group">
          <label><input type="checkbox" checked={form.exibirBid} onChange={onCheckbox('exibirBid')} /> Exibir logo BID</label>
          <label><input type="checkbox" checked={form.exibirFundepar} onChange={onCheckbox('exibirFundepar')} /> Exibir logo FUNDEPAR</label>
        </div>
        <div className="actions-row">
          <button type="submit">Gerar placa</button>
        </div>
      </form>
      <PlatePreview form={form} />
    </div>
  );
}

type FieldProps = {
  label: string;
  children: ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}
