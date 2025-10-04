# 🚀 Deploy no GitHub Pages - D&D 5e Character Creator

Este guia explica como fazer o deploy do site de RPG no GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório criado no GitHub
- Git instalado localmente (opcional)

## 🔧 Passo a Passo

### 1. Preparar os Arquivos

Os seguintes arquivos já estão prontos para o GitHub Pages:

```
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica JavaScript
├── data.js                 # Dados do D&D 5e
├── 404.html               # Página de erro 404
├── .nojekyll              # Configuração para GitHub Pages
├── .github/workflows/     # Workflow de deploy automático
└── README_GH_PAGES.md     # Documentação
```

### 2. Upload para o GitHub

#### Opção A: Via Interface Web do GitHub

1. **Acesse seu repositório no GitHub**
2. **Clique em "Add file" > "Upload files"**
3. **Arraste todos os arquivos** para a área de upload
4. **Adicione uma mensagem de commit:** "Deploy inicial do D&D Character Creator"
5. **Clique em "Commit changes"**

#### Opção B: Via Git (Recomendado)

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO

# Copie os arquivos para o diretório
# (copie todos os arquivos listados acima)

# Adicione os arquivos ao Git
git add .

# Faça o commit
git commit -m "Deploy inicial do D&D Character Creator"

# Envie para o GitHub
git push origin main
```

### 3. Configurar GitHub Pages

1. **Acesse seu repositório no GitHub**
2. **Vá para Settings** (aba superior)
3. **Role até "Pages"** (menu lateral esquerdo)
4. **Em "Source":**
   - Selecione **"Deploy from a branch"**
   - Escolha **"main"** como branch
   - Escolha **"/ (root)"** como pasta
5. **Clique em "Save"**

### 4. Aguardar o Deploy

- O GitHub levará alguns minutos para processar
- Você verá uma mensagem verde: "Your site is published at..."
- O site estará disponível em: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO`

### 5. Verificar se Funcionou

1. **Acesse a URL do seu site**
2. **Teste as funcionalidades:**
   - Navegação entre abas
   - Criação de personagem
   - Salvamento/carregamento
   - Modo escuro
   - Responsividade

## 🔄 Deploy Automático

Com o workflow configurado, futuras atualizações serão deployadas automaticamente:

1. **Faça alterações nos arquivos**
2. **Commit e push para o branch main**
3. **O GitHub Actions fará o deploy automaticamente**

## 🛠️ Personalização

### Alterar o Nome do Site

1. **Edite `index.html`**
2. **Altere o título na tag `<title>`**
3. **Altere o texto do cabeçalho**

### Adicionar Novas Raças/Classes

1. **Edite `data.js`**
2. **Adicione novos dados no objeto `gameData`**
3. **Faça commit e push**

### Personalizar Cores

1. **Edite `styles.css`**
2. **Modifique as variáveis CSS no `:root`**
3. **Faça commit e push**

## 🐛 Solução de Problemas

### Site não carrega
- Verifique se todos os arquivos foram enviados
- Confirme se o GitHub Pages está ativado
- Aguarde alguns minutos para o processamento

### Erro 404
- Verifique se o arquivo `index.html` está na raiz
- Confirme se o branch correto está selecionado

### Estilos não aplicam
- Verifique se o arquivo `styles.css` foi enviado
- Confirme se o caminho está correto no HTML

### JavaScript não funciona
- Verifique se os arquivos `app.js` e `data.js` foram enviados
- Abra o console do navegador para ver erros
- Confirme se os caminhos estão corretos

## 📱 Teste de Responsividade

Teste o site em diferentes dispositivos:

1. **Desktop:** Chrome, Firefox, Safari, Edge
2. **Tablet:** iPad, Android tablets
3. **Mobile:** iPhone, Android phones

## 🔒 Segurança

- O site é estático e seguro
- Não há processamento de dados no servidor
- Dados são salvos apenas no navegador do usuário

## 📊 Analytics (Opcional)

Para adicionar analytics:

1. **Crie uma conta no Google Analytics**
2. **Adicione o código de tracking no `index.html`**
3. **Faça commit e push**

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Compartilhe o link** com a comunidade RPG
2. **Colete feedback** dos usuários
3. **Implemente melhorias** baseadas no feedback
4. **Adicione novas funcionalidades**

## 📞 Suporte

Se encontrar problemas:

1. **Verifique a documentação do GitHub Pages**
2. **Consulte os logs do GitHub Actions**
3. **Abra uma issue no repositório**

---

**🎉 Parabéns! Seu site de RPG está no ar!**

Acesse: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO`