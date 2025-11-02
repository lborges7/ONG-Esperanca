# ONG Esperança

Projeto front-end: site institucional para uma ONG fictícia (ONG Esperança).  
Versão preparada por **Lucas Borges** — Projeto acadêmico e exemplar para portfólio.

## Descrição
Site institucional demonstrando boas práticas de HTML5, CSS3 e JavaScript:
- Acessibilidade (skip-link, aria, contrastes)
- Responsividade (grid e flexbox)
- Interatividade (carrossel, máscaras, validação, tema escuro)
- Micro-interações e animações suaves

## Estrutura do projeto
```
ONG-Esperanca/
├── index.html
├── projetos.html
├── quem-somos.html
├── depoimentos.html
├── cadastro.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
└── README.md
```

> Observação: as imagens não foram incluídas neste pacote (você informou que as possui localmente). Mantenha as imagens na pasta `images/` com os mesmos nomes para que o site funcione corretamente.

## Tecnologias
- HTML5 semântico
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6) — sem frameworks, modular
- Deploy sugerido: GitHub Pages

## Como usar localmente
1. Extraia o conteúdo do ZIP.
2. Abra `index.html` no navegador, ou rode via servidor local:
```bash
# opção simples com Python 3
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicação no GitHub Pages (resumo)
1. Crie repositório público no GitHub (`ONG-Esperanca`).
2. Faça `git add .` / `git commit -m "Versão final"` / `git push`.
3. No GitHub: Settings → Pages → Deploy from branch `main` (root).
4. Aguarde o deploy e acesse `https://SEU-USUARIO.github.io/ONG-Esperanca/`.

## Observações e melhorias possíveis
- Minificar assets adicionais para produção.
- Adicionar testes de acessibilidade automatizados (axe).
- Implementar um formulário que envie dados para backend / serviço (ex: Netlify forms).

---

**Lucas Borges**
Projeto preparado para avaliação e portfólio.
