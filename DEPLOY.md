# 🚀 Guia de Deploy para GitHub Pages

Este guia explica como fazer o deploy da aplicação D&D Character Creator para o GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js 18+ instalado

## 🔧 Configuração Inicial

### 1. Fork do Repositório

1. Acesse [https://github.com/seu-usuario/dnd-character-creator](https://github.com/seu-usuario/dnd-character-creator)
2. Clique em "Fork" no canto superior direito
3. Clone seu fork localmente:

```bash
git clone https://github.com/SEU-USUARIO/dnd-character-creator.git
cd dnd-character-creator
```

### 2. Configuração do GitHub Pages

1. Acesse as configurações do seu repositório no GitHub
2. Vá para "Pages" no menu lateral
3. Em "Source", selecione "GitHub Actions"
4. Salve as configurações

## 🚀 Deploy Automático

O deploy automático está configurado via GitHub Actions. Toda vez que você fizer push para a branch `main`, a aplicação será automaticamente construída e publicada.

### Workflow de Deploy

O arquivo `.github/workflows/deploy.yml` contém a configuração do deploy automático:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔄 Deploy Manual

Se preferir fazer o deploy manualmente:

### 1. Instalar Dependências

```bash
npm install
```

### 2. Build da Aplicação

```bash
npm run build
```

### 3. Deploy para GitHub Pages

```bash
npm run deploy:github
```

Este comando irá:
- Construir a aplicação
- Fazer push da pasta `dist` para a branch `gh-pages`
- Ativar o GitHub Pages automaticamente

## 🌐 Acessando a Aplicação

Após o deploy, sua aplicação estará disponível em:

```
https://SEU-USUARIO.github.io/dnd-character-creator
```

## 🔧 Configurações Importantes

### Base Path

O arquivo `vite.config.ts` está configurado com o base path correto:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/dnd-character-creator/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Arquivo .nojekyll

O arquivo `.nojekyll` está incluído para garantir que o GitHub Pages não processe os arquivos com Jekyll.

## 🐛 Solução de Problemas

### Deploy não funciona

1. Verifique se o GitHub Actions está ativado
2. Confirme se a branch `gh-pages` foi criada
3. Verifique os logs do GitHub Actions

### Aplicação não carrega

1. Verifique se o base path está correto no `vite.config.ts`
2. Confirme se o arquivo `.nojekyll` está presente
3. Verifique se a branch `gh-pages` contém os arquivos da pasta `dist`

### Erro de permissão

1. Verifique se o token `GITHUB_TOKEN` tem as permissões necessárias
2. Confirme se o repositório permite GitHub Actions

## 📝 Atualizações

Para atualizar a aplicação:

1. Faça as alterações no código
2. Commit e push para a branch `main`:

```bash
git add .
git commit -m "Atualização da aplicação"
git push origin main
```

3. O deploy automático será executado
4. Aguarde alguns minutos e acesse a URL da aplicação

## 🎯 Dicas

- Sempre teste localmente antes de fazer push
- Use `npm run preview` para testar o build localmente
- Monitore os logs do GitHub Actions para identificar problemas
- Mantenha o repositório atualizado com as dependências

---

**Pronto! Sua aplicação D&D Character Creator estará online no GitHub Pages! 🎲⚔️**