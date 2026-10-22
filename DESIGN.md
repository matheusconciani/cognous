# DESIGN.md - Identidade Visual & Sistema de Design COGNOUS

## 1. Identidade e Propósito da Marca
- **Produto:** COGNOUS - Sistema Integrado de Gestão para Escolas de Ensino Fundamental (Pequeno e Médio Porte).
- **Missão:** Libertar a liderança escolar, a equipe de RH e o corpo docente da fragmentação de planilhas e softwares arcaicos, oferecendo uma experiência unificada, calorosa e precisa.
- **Público-alvo:** Diretores pedagógicos, mantenedores, secretários escolares, analistas de RH e professores do Ensino Fundamental I e II (escolas de 60 a 600 alunos).
- **Personalidade:** Institucional contemporânea, acolhedora, serena e confiável. Inspirada em publicações de arquitetura educacional, livros acadêmicos bem diagramados e cadernos de aula clássicos. Zero estética genérica de SaaS futurista.

## 2. Mostradores de Vitalidade (Liveliness Dials)
- **ENERGY: 3 (Acolhedor & Lúdico / Kiddy Escolar)** - Calor pedagógico com estética de cadernos escolares, adesivos táticos e ilustrações funcionais. Celebra a infância e o dia a dia do Ensino Fundamental com cor e alegria sem perder a autoridade institucional.
- **RHYTHM: 3 (Composição Variada)** - Seções com cadência editorial rica: manifesto de abertura com pauta sutil de caderno, bancada interativa de papéis (Gestão, RH, Professores, Famílias), simulador real de chamada de sala, calculadora transparente de economia de horas e painel regulatório (MEC / BNCC / LGPD).
- **MOTION: 2 (Transições com Propósito via GSAP & Anime.js)** -
  - **GSAP:** Entrada orquestrada do Hero (título, descrição, botões, stickers em escala com `back.out(1.8)` e traçado SVG dos sublinhados estilo marcador).
  - **Anime.js:** Feedback tátil ao interagir com a calculadora, micro-salto ao alternar presença de alunos e chuva comemorativa de estrelas escolares ("Parabéns!") ao consolidar o diário escolar. Respeito irrestrito a `prefers-reduced-motion`.

## 3. Paleta de Cores e Contraste (WCAG AA Verificado)
- **Fundo Base (Paper):** `#FAF7F2` (Papel marfim vegetal claro com textura sutil de pauta escolar)
  - No modo escuro: `#0E1511` (Ardósia noturna profunda)
- **Tinta Primária (Ink):** `#14241B` (Verde floresta escuro de arquivo, contraste superior a 14:1)
  - No modo escuro: `#F0EDE6` (Marfim suave de alto contraste)
- **Tinta Secundária (Muted):** `#3D4F44` (Ardósia vegetal para leitura fluida)
  - No modo escuro: `#C3CEC7`
- **Acento Deliberado (Terracotta):** `#B04B1D` / `#963C14` (Tijolo terracota artesanal de escola tradicional)
- **Paleta de Giz de Cera & Adesivos Escolares (Kiddy Accents):**
  - **Amarelo Estrela / Giz:** `#F59E0B` / `#FEF08A` (Adesivos "Nota 10", destaques de foco)
  - **Azul Caderno / Matemática:** `#0284C7` / `#BAE6FD` (RH docente, pautas de cálculo)
  - **Verde Gramado / Recreio:** `#059669` / `#A7F3D0` (Alunos presentes, conformidade BNCC)
  - **Coral Maçã da Profa:** `#E11D48` / `#FECDD3` (Acolhimento familiar, alertas preventivos)
  - **Lilás Alfabetização:** `#7C3AED` / `#DDD6FE` (Mochilas leves, LGPD e cuidados)

## 4. Tipografia
- **Títulos e Destaques Editoriais:** `Newsreader` (Serifada humanista com ritmo literário e pedagógico).
- **Adesivos & Micro-Badges Lúdicos:** `Fredoka` (Sem serifa arredondada, amigável e calorosa para o universo infantil).
- **Anotações Manuscritas de Professor:** `Caveat` (Estilo canetinha de correção carinhosa).
- **Corpo de Texto e Controles:** `Plus Jakarta Sans` (Clareza milimétrica em telas pequenas e médias).
- **Códigos e Matrículas:** `JetBrains Mono` (Apenas para identificadores escolares e horários).

## 5. Motivo Visual Identitário (Identity Motif)
- **Adesivos Escolares Colecionáveis (Stickers):** Selos físicos com borda branca, leve rotação (-6° a +4°) e relevo de papelaria escolar (estrela, lápis, maçã, coração, mochila, carimbo de aprovação).
- **Sublinhados Orgânicos (Underline Markers):** Traços ondulados desenhados em SVG animado e faixas de marca-texto pastel realçando palavras-chave como *"educar"*, *"transparente"*, *"pode economizar"* e *"rotina escolar"*.
- **Pauta de Caderno Escolar:** Linhas de guia horizontais milimétricas no fundo, conferindo textura com propósito funcional.

## 6. Justificativa de Decisões de Design (R-31)
- **Por que elementos lúdicos e "kiddy"?** Uma escola de Ensino Fundamental lida com crianças de 6 a 14 anos. Um sistema frio afasta educadores. Elementos lúdicos bem dosados despertam afeto, reduzem a resistência de professores à tecnologia e tornam a experiência acolhedora.
- **Por que animações com GSAP e Anime.js?** Para fornecer feedback imediato (affordance tátil): ao consolidar o diário, a professora recebe a recompensa de uma celebração visual; ao mexer na calculadora, os números reagem com elasticidade natural.
- **Por que sem dados falsos?** Confiabilidade em educação é inegociável. Cada dado exibido é baseado no contexto real de turmas do 1º ao 9º ano.
