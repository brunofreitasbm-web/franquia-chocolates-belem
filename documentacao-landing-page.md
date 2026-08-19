# Documentação da Landing Page — Repasse de Duas Operações

Documentação técnica e de conteúdo da página publicada em `franquia-chocolates-belem.netlify.app`.

> **Atenção — este repositório é público.** Esta documentação segue as mesmas regras de confidencialidade da própria página: nenhum nome comercial, marca, logotipo, código de loja, bairro identificável ou dado financeiro reservado aparece aqui. Os dados completos das unidades ficam apenas nos documentos internos, fora deste repositório. Antes de commitar qualquer coisa aqui, confira que a regra continua valendo.

---

## 1. O que é esta página

Landing page de captação de interessados no **repasse de duas operações** no ramo de chocolates e presentes, conduzido **diretamente pelo franqueado atual**, sem intermediários.

**O que ela não é:** não é página institucional de uma empresa anunciando venda, e não é página de venda direta. Nenhum elemento pressiona fechamento imediato (sem contador regressivo, sem "últimas vagas", sem pop-up de saída) — isso contradiria o próprio funil, que exige triagem antes de expor dado sensível.

**Objetivo único:** taxa de preenchimento do formulário de triagem, segmentado por unidade de interesse.

**Métricas a instrumentar:** visualizações da página, cliques em cada CTA de ficha, taxa de conclusão do formulário, taxa de abandono por campo.

---

## 2. Voz e posicionamento

A página fala em **primeira pessoa, como o franqueado**. Essa foi a mudança central em relação à versão anterior, que soava como empresa vendendo franquia para investidor.

| Antes (institucional) | Agora (repasse direto) |
|---|---|
| "Seja dono de uma franquia consolidada" | "Estou repassando duas operações já estruturadas" |
| "Nossa equipe entrará em contato" | "Vou revisar suas respostas e retornar" |
| "Fale com nossos consultores" | "Cadastre seu interesse e vamos conversar" |

Regra de tom: consultoria de negócios séria, não growth hacking. Evitar expressões que soem tradução de inglês de marketing ("game changer", "unlock", "leverage").

---

## 3. Sistema visual

### 3.1 Direção de arte

**Editorial neutro** — grid limpo, tipografia como hierarquia principal, paleta cromática própria.

Racional: o público responde melhor a sinais de seriedade e transparência do que a estética "start-up moderna". Um visual mais sóbrio também reduz a chance de a peça ser reconhecida e repassada como curiosidade nas redes antes de chegar a um candidato sério.

### 3.2 Paleta

Definida em `css/style.css` como custom properties no `:root`.

| Token | Valor | Uso |
|---|---|---|
| `--color-cream` | `#F4EFE9` | Fundo base |
| `--color-cream-alt` | `#ECE3D8` | Seções alternadas, cards de persona |
| `--color-ink` | `#241F1C` | Texto principal, seções escuras |
| `--color-ink-soft` | `#5A544E` | Texto secundário |
| `--color-accent` | `#9C5B32` | Botões, eyebrows, links de ação |
| `--color-accent-light` | `#B8703F` | Apenas decorativo (bordas, formas) |
| `--color-olive` | `#5C6B57` | Badges, checkmarks, segunda unidade |
| `--color-olive-bg` | `#E4E6DF` | Fundo de badge e ícones |

**Regra crítica:** nunca usar marrom-escuro + dourado + vermelho juntos na mesma peça. Essa combinação é a mais associável a redes de chocolate no imaginário do público brasileiro — é exatamente o que precisamos evitar, mesmo indiretamente. A versão anterior da página usava marrom + dourado e foi substituída por esse motivo.

**Nota de contraste:** o terracota de acento foi escurecido de `#B8703F` para `#9C5B32` porque o tom original não atingia 4.5:1 sobre o fundo creme. O `#B8703F` permanece apenas em elementos decorativos, onde não carrega texto.

### 3.3 Tipografia

- **Títulos:** Fraunces (serifada editorial) — transmite "negócio sério e estabelecido", não "start-up".
- **Corpo/UI:** Inter (sans-serif neutra).
- Máximo 2 famílias. Título ≥32px desktop / ≥24px mobile. Corpo ≥16px.
- Carregadas via Google Fonts com `preconnect`.

### 3.4 Regras de composição

- Um único CTA visualmente dominante por seção. Nunca dois CTAs de mesmo peso competindo.
- Contraste mínimo 4.5:1 em todas as combinações de cor.
- **Fotografia:** nenhuma foto real de loja, fachada, produto embalado ou equipe pode entrar na página. O hero usa uma "ficha resumo" em CSS (card estilo documento, com linhas pontilhadas) justamente para não depender de imagem. As formas circulares decorativas da versão anterior foram removidas. Se for adicionar foto no futuro, ela precisa ser genérica, sem logotipo visível de nenhuma marca — inclusive de terceiros, para não sugerir parceria não autorizada.

---

## 4. Estrutura da página

| # | Seção | ID | Função |
|---|---|---|---|
| 1 | Header fixo | `#header` | Navegação + CTA persistente |
| 2 | Hero | `#topo` | Proposta central + CTA duplo + card de resumo |
| 3 | Por que estou repassando | `#historia` | Bloco pessoal do franqueado + 3 pontos de confiança |
| 4 | As duas unidades | `#unidades` | Fichas independentes, dados por unidade |
| 5 | Como funciona | `#como-funciona` | Timeline vertical de 5 etapas do processo |
| 6 | FAQ | `#faq` | 6 perguntas, incluindo a do anonimato |
| 7 | Formulário de triagem | `#lead-form` | Conversão — único ponto de entrada |
| 8 | Rodapé | — | Aviso de confidencialidade |

A antiga seção "Perfis de investidor" foi fundida nas fichas: cada unidade traz uma linha "para quem faz sentido" antes do preço. Mesma função de auto-seleção, uma seção a menos de rolagem.

### 4.1 Copy do hero

- **Badge:** "Repasse direto do franqueado, sem intermediários"
- **Headline:** "Estou repassando duas operações estruturadas no ramo de chocolates e presentes"
- **Subheadline:** "Uma em Belém, outra em Ananindeua. Equipe treinada, fornecimento definido e vendas em operação: você assume um negócio que já funciona, não abre um do zero."
- **CTA primário:** "Ver as duas oportunidades" → `#unidades`
- **CTA secundário:** "Cadastrar meu interesse" → `#lead-form`

A headline nomeia o setor (chocolates e presentes) sem citar marca, já filtrando quem não tem interesse no segmento.

### 4.2 Fichas das unidades

Duas fichas de estrutura idêntica e conteúdo específico. **Elas nunca compartilham números** — misturar os dados faria um candidato assumir que os indicadores de uma valem para a outra, o que seria falso.

Distinção visual: chip de categoria preenchido — terracota na unidade de rua, oliva na de supermercado. (A borda superior colorida foi removida; era um padrão genérico de card.)

Cada ficha traz: tag de categoria, título, localização genérica, 5 bullets de ponto forte, bloco de 2 indicadores, linha de perfil ideal ("para quem faz sentido"), valor de aquisição e CTA próprio. O CTA carrega `data-unit`, que pré-seleciona a unidade no formulário via JS.

**CTA repetido nas duas** ("Quero saber mais sobre esta unidade") em vez de "Comprar" ou "Fechar negócio" — mantém o funil consistente com o objetivo real, que é gerar interesse qualificado, não fechar venda na página.

### 4.3 Como funciona — as 5 etapas

1. Cadastro e triagem
2. Conversa e confidencialidade
3. Acesso ao DRE completo
4. Processo junto à franqueadora
5. Transferência

Texto de apoio: "Este é um processo formal de transferência dentro de uma rede de franquia nacional. Quem compra passa por aprovação da própria rede antes da conclusão — isso protege as duas partes."

---

## 5. Formulário de triagem

`name="repasse-operacoes"`, processado por **Netlify Forms** (`data-netlify="true"`), com honeypot anti-spam (`netlify-honeypot="bot-field"`).

| Campo | `name` | Obrigatório | Tipo |
|---|---|---|---|
| Unidade de interesse | `unidade` | Sim | select (3 opções) |
| Nome completo | `nome` | Sim | text |
| E-mail | `email` | Sim | email |
| Telefone / WhatsApp | `telefone` | Sim | tel |
| Capital disponível | `capital` | Sim | select (3 faixas) |
| Experiência prévia | `experiencia` | Não | select |
| Motivação | `motivacao` | Não | select |
| Prazo para concluir | `prazo` | Não | select |
| Mensagem | `mensagem` | Não | textarea |
| Ciência da aprovação | `ciencia` | Sim | checkbox |
| Aceite de confidencialidade | `confidencialidade` | Sim | checkbox |

**Botão:** "Enviar e agendar conversa" — nomeia o próximo passo em vez de "Enviar" solto, o que reduz a ansiedade de "e agora?".

**Confirmação:** "Cadastro recebido / Vou revisar suas respostas e retornar em até 2 dias úteis com o próximo passo." Define prazo concreto em vez de "em breve" vago, e não promete algo que a operação não consegue cumprir.

Os dois checkboxes obrigatórios existem para registrar ciência antes de qualquer envio de dado sensível — são parte do controle do funil, não formalidade.

---

## 6. Confidencialidade — o que nunca pode entrar

Vale para a página, para este repositório e para qualquer peça de campanha derivada.

- ❌ Nome comercial, marca, logotipo, fachada, embalagem ou qualquer identificação visual da rede
- ❌ Endereço exato de qualquer das duas unidades (usar apenas "bairro de alto fluxo em Belém/PA" e "supermercado de grande porte em Ananindeua/PA", sem citar o nome do supermercado)
- ❌ Códigos internos de loja
- ❌ Valores exatos de faturamento e lucro
- ❌ Situação de pendências, acordos ou dívidas com a franqueadora
- ❌ Qualquer afirmação financeira não verificável pelos registros reais
- ❌ Telefone pessoal exposto — o formulário é o único ponto de entrada

Isso vale inclusive para metadados: `title`, `meta description`, `alt` de imagem e nome de arquivo.

Os indicadores que **estão** na página (ticket médio, clientes/dia, despesa fixa, cobertura do ponto de equilíbrio, sazonalidade, valor de aquisição) foram liberados deliberadamente por serem qualitativos ou não identificáveis isoladamente. O DRE completo só vai para quem passa pela triagem e assina o termo.

---

## 7. Stack e deploy

- HTML estático + CSS puro + JS vanilla. Sem build, sem dependências.
- `netlify.toml` publica a raiz, sem comando de build, e define headers de segurança (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
- Deploy automático a cada push na `main`.
- Netlify Forms habilitado — as respostas chegam no painel do projeto.

### Arquivos

```
index.html    — toda a estrutura e copy
css/style.css — tokens de design + estilos (mobile-first nos breakpoints 960/760/600)
js/script.js  — menu mobile, pré-seleção de unidade, envio AJAX do formulário
```

### Rodar localmente

```bash
python3 -m http.server 8000
```

---

## 8. Pendências antes de escalar tráfego

- [ ] Confirmar a redação sobre a situação da unidade de rua junto à franqueadora. A página **não** afirma "zero pendências" — essa frase seria falsa pelos registros. Se for usar qualquer variação disso na campanha, valide antes.
- [ ] Definir o valor final da unidade de supermercado ou confirmar "sob consulta" definitivo. Preço indefinido filtra candidatos mais sérios, mas reduz a taxa de clique no anúncio.
- [ ] Alinhar a explicação dos períodos financeiros mais fracos antes da primeira reunião — o DRE pós-triagem mostra tudo, e a explicação precisa estar pronta antes, não durante.
- [ ] Preparar o discurso de turnaround da unidade de supermercado.
- [ ] Preparar o termo de confidencialidade (NDA) simples.
- [ ] Confirmar que anunciar as duas operações juntas não vai chegar à equipe ou à franqueadora antes do planejado — duas unidades do mesmo operador ao mesmo tempo é um padrão mais fácil de reconhecer do que uma isolada.
- [ ] Validar com alguém de fora do projeto se a paleta e a tipografia realmente não remetem à identidade visual de nenhuma rede conhecida.

---

## 9. Como editar

**Trocar copy:** direto no `index.html`, seções comentadas com separadores `<!-- ===== NOME ===== -->`.

**Trocar cor:** apenas nas custom properties do `:root` em `css/style.css`. Não hardcodar cor em regra individual — respeite os tokens ou o sistema perde consistência.

**Adicionar unidade:** duplicar um `<article class="unit-card">`, ajustar `data-unit` no CTA e adicionar a opção correspondente no `<select id="unidade">`. O JS de pré-seleção pega a nova ficha automaticamente.

**Adicionar campo no formulário:** o `name` do campo é o que aparece no painel do Netlify — nomeie pensando em quem vai ler a resposta, não no código.
