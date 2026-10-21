# Documentação da Landing Page — Repasse de Duas Operações

Documentação técnica e de conteúdo da página publicada em `franquia-chocolates-belem.netlify.app`.

> **Atenção — este repositório é público.** Esta documentação segue as mesmas regras de confidencialidade da própria página: nenhum endereço exato, código de loja ou dado financeiro reservado aparece aqui. A marca (Cacau Show) pode ser nomeada desde a revisão registrada em `dna-oferta.md`. Os dados completos das unidades ficam apenas nos documentos internos, fora deste repositório. Antes de commitar qualquer coisa aqui, confira que a regra continua valendo.

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
- **Fotografia:** fotos de fachada e produto são permitidas desde a liberação da marca; nenhuma foto de equipe ou que revele o endereço exato (número, rua, placa de esquina). O hero usa uma "ficha resumo" em CSS (card estilo documento, com linhas pontilhadas) justamente para não depender de imagem. As formas circulares decorativas da versão anterior foram removidas. Se for adicionar foto no futuro, ela precisa ser genérica, sem logotipo visível de nenhuma marca — inclusive de terceiros, para não sugerir parceria não autorizada.

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
- **Headline:** "Estou repassando uma operação estruturada no ramo de chocolates e presentes"
- **Subheadline:** "Localizada no bairro da Marambaia em Belém/PA. Equipe treinada, fornecimento definido e vendas em operação: você assume um negócio que já funciona, não abre um do zero."
- **CTA primário:** "Ver a oportunidade" → `#unidades`
- **CTA secundário:** "Cadastrar meu interesse" → `#lead-form`

A headline nomeia o setor (chocolates e presentes) sem citar marca, já filtrando quem não tem interesse no segmento.

### 4.2 Alternador de Unidades e Fichas

A página possui um seletor no topo que permite ao interessado alternar dinamicamente entre as duas operações:
- **Loja Marambaia (Belém/PA):** R$ 210.000 (Fat. 12M: R$ 1,23 Mi · Páscoa: R$ 400k)
- **Loja Icoaraci (Belém/PA):** R$ 165.000 (Fat. 12M: R$ 756 Mil · Páscoa: R$ 270k · Crescimento YoY: +20% vendas / +215% lucro op. · Aluguel: R$ 3.000/mês)

Ao alternar a aba:
- O título, badges e números do Hero são atualizados.
- As fotos reais de cada loja são exibidas.
- Os 4 cards de destaque e os números de sazonalidade se adaptam à unidade selecionada.
- O campo de oportunidade no formulário seleciona a unidade correspondente por padrão.

---

## 5. Formulário de triagem

Processado por **Netlify Forms** (`data-netlify="true"`).

| Campo | `name` | Obrigatório | Opções |
|---|---|---|---|
| Oportunidade | `oportunidade` | Sim | Qualquer uma das duas (avaliar na conversa) / Unidade Belém (Marambaia) — R$ 210.000 / Unidade Belém (Icoaraci) — R$ 165.000 |
| Nome completo | `nome` | Sim | text |
| Telefone / WhatsApp | `telefone` | Sim | tel |
| E-mail | `email` | Sim | email |
| Capital disponível | `investimento` | Sim | Até R$ 165 mil / R$ 165 mil a R$ 250 mil / Acima de R$ 250 mil |
| Experiência prévia | `experiencia` | Não | Sim / Não |
| Prazo para adquirir | `prazo` | Não | Imediato (Até 30 dias) / 30 a 90 dias / Mais de 90 dias |

---

## 6. Confidencialidade — o que nunca pode entrar

Vale para a página, para este repositório e para qualquer peça de campanha derivada.

- ❌ Endereço exato das unidades (usar apenas "bairro da Marambaia em Belém/PA" e "principal avenida comercial de Icoaraci em Belém/PA", sem citar o número ou rua exata)
- ❌ Códigos internos de loja
- ❌ Valores de lucro, margem, aluguel, folha ou royalties
- ❌ Situação de pendências, acordos ou dívidas com a franqueadora
- ❌ Qualquer afirmação financeira não verificável pelos registros reais
- ❌ Telefone pessoal exposto — o formulário é o único ponto de entrada

Isso vale inclusive para metadados: `title`, `meta description`, `alt` de imagem e nome de arquivo.

Os únicos números liberados deliberadamente para a página são o faturamento dos últimos 12 meses, o pico mensal da Páscoa e o valor de repasse (decisão registrada em `dna-oferta.md`, seção 3.4). A marca é nomeada abertamente (Cacau Show, 1ª no ranking ABF 2026); o sigilo cobre endereço exato, funcionários, clientes e números. O DRE completo só vai para quem passa pela triagem e assina o termo.

**Fonte da copy:** `dna-oferta.md` (Promessa · Confiança · Oferta). Qualquer texto novo no site, no Instagram ou em campanha segue aquele documento, inclusive o glossário de termos proibidos.

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

- [ ] Confirmar a redação sobre a situação da unidade junto à franqueadora. A página **não** afirma "zero pendências" — essa frase seria falsa pelos registros. Se for usar qualquer variação disso na campanha, valide antes.
- [x] Ponto de Ananindeua removido do site por estar em negociação. Foco 100% na unidade de Belém (Marambaia).
- [ ] Alinhar a explicação dos períodos financeiros mais fracos antes da primeira reunião — o DRE pós-triagem mostra tudo, e a explicação precisa estar pronta antes, não durante.
- [ ] Preparar o termo de confidencialidade (NDA) simples.
- [ ] Preencher os placeholders `[A CONFIRMAR]` de `dna-oferta.md` (prazo do aluguel, valor de estoque, taxa de transferência).
- [ ] Validar com alguém de fora do projeto se a paleta e a tipografia realmente não remetem à identidade visual de nenhuma rede conhecida.

---

## 9. Como editar

**Trocar copy:** o `index.html` publicado é um bundle gerado por ferramenta de design; a página real está embutida como string JSON dentro de `<script type="__bundler/template">`. Não edite essa linha à mão. Edite `scratch_s4.html` (versão plana, sempre extraída do bundle ao vivo) e reembuta com o script descrito no README.

**Trocar cor:** apenas nas custom properties do `:root` em `css/style.css`. Não hardcodar cor em regra individual — respeite os tokens ou o sistema perde consistência.

**Adicionar unidade:** duplicar um `<article class="unit-card">`, ajustar `data-unit` no CTA e adicionar a opção correspondente no `<select id="unidade">`. O JS de pré-seleção pega a nova ficha automaticamente.

**Adicionar campo no formulário:** o `name` do campo é o que aparece no painel do Netlify — nomeie pensando em quem vai ler a resposta, não no código.
