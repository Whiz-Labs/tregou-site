# Tregou Site

Landing page para [tregou.app](https://tregou.app).

## Estrutura do Projeto

```
tregou-site/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Acesse http://localhost:4321

# Verificar tipos e erros
npm run astro check
```

## Build para Produção

```bash
# Gerar site estático
npm run build

# Preview local do build
npm run preview
```

Os arquivos estáticos são gerados em `./dist/`.

## Deploy

### GitHub Pages

1. Adicione o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. Em Settings > Pages, selecione "GitHub Actions" como source.

### Netlify

1. Conecte o repositório no [Netlify](https://app.netlify.com).
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático a cada push.

### Vercel

```bash
npx vercel
```

Ou conecte o repositório em [vercel.com](https://vercel.com).

## Tecnologias

- [Astro](https://astro.build) v5 - Framework web para sites focados em conteúdo
- CSS vanilla com variáveis CSS
- [Inter](https://rsms.me/inter/) - Font do Google Fonts
