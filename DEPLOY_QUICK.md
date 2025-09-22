# 🚀 Deploy Rápido - D&D 5e Character Creator

## ⚡ Deploy em 3 Passos

### 1️⃣ Preparar o Repositório
```bash
# Execute o script de configuração
./setup_git.sh

# Ou configure manualmente:
git init
git add .
git commit -m "🎲 Initial commit: D&D 5e Character Creator"
git branch -M main
```

### 2️⃣ Criar Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Nome: `dnd-character-creator`
3. Descrição: `Sistema completo para criação de fichas de personagem D&D 5e`
4. Marque como **Público**
5. Clique em "Create repository"

### 3️⃣ Conectar e Fazer Deploy
```bash
# Conectar ao GitHub
git remote add origin https://github.com/SEU_USUARIO/dnd-character-creator.git
git push -u origin main

# Deploy no Streamlit Cloud
# 1. Acesse https://share.streamlit.io
# 2. Login com GitHub
# 3. New app > Selecione o repositório
# 4. Main file: streamlit_app.py
# 5. Deploy!
```

## 🎯 Resultado
Sua aplicação estará disponível em:
`https://SEU_APP_NAME.streamlit.app`

## ✅ Verificações
- [ ] Repositório criado no GitHub
- [ ] Código enviado para o GitHub
- [ ] App configurado no Streamlit Cloud
- [ ] Aplicação funcionando online
- [ ] Todas as funcionalidades testadas

## 🆘 Problemas Comuns

### Erro de Importação
- Verifique se `streamlit_app.py` está na raiz
- Confirme que todos os arquivos estão no repositório

### Dependências Não Encontradas
- Verifique o `requirements.txt`
- Confirme as versões das dependências

### App Não Carrega
- Verifique os logs no Streamlit Cloud
- Teste localmente primeiro: `streamlit run streamlit_app.py`

## 📞 Suporte
- **Streamlit Cloud:** [docs.streamlit.io](https://docs.streamlit.io)
- **GitHub Issues:** Use o sistema de issues do repositório
- **Documentação:** Consulte o README.md

---
**🎲 Divirta-se criando personagens!**