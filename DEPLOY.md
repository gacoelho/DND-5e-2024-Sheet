# 🚀 Guia de Deploy - D&D 5e Character Creator

Este guia explica como fazer o deploy da aplicação no Streamlit Cloud.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Streamlit Cloud
- Repositório GitHub com o código da aplicação

## 🔧 Configuração do Repositório

### 1. Estrutura do Projeto
```
dnd-character-creator/
├── app.py                 # Aplicação principal
├── streamlit_app.py       # Arquivo para Streamlit Cloud
├── requirements.txt       # Dependências Python
├── README.md             # Documentação
├── DEPLOY.md             # Este arquivo
├── .streamlit/           # Configurações do Streamlit
│   ├── config.toml
│   └── secrets.toml
├── backend/              # Código do backend
│   ├── __init__.py
│   ├── character.py
│   ├── race.py
│   ├── class_.py
│   ├── background.py
│   ├── item.py
│   ├── ability.py
│   ├── data_manager.py
│   ├── character_manager.py
│   ├── pdf_exporter.py
│   ├── translations.py
│   ├── user_manager.py
│   └── data/
│       ├── races.json
│       ├── classes.json
│       └── backgrounds.json
└── frontend/             # Código do frontend
    ├── __init__.py
    ├── character_creator.py
    ├── character_sheet.py
    └── utils.py
```

### 2. Arquivos de Configuração

#### requirements.txt
```
streamlit>=1.28.0
pandas>=2.0.0
numpy>=1.24.0
reportlab>=4.0.0
Pillow>=10.0.0
```

#### .streamlit/config.toml
```toml
[theme]
primaryColor = "#FF6B6B"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"
textColor = "#262730"
font = "sans serif"

[server]
headless = true
port = 8501
enableCORS = false
enableXsrfProtection = false

[browser]
gatherUsageStats = false
```

## 🌐 Deploy no Streamlit Cloud

### 1. Preparação do Repositório

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: D&D 5e Character Creator"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/dnd-character-creator.git
   git push -u origin main
   ```

2. **Verifique se todos os arquivos estão incluídos:**
   - ✅ `streamlit_app.py` (arquivo principal)
   - ✅ `requirements.txt`
   - ✅ `.streamlit/config.toml`
   - ✅ Todos os arquivos do backend e frontend

### 2. Deploy no Streamlit Cloud

1. **Acesse o Streamlit Cloud:**
   - Vá para [share.streamlit.io](https://share.streamlit.io)
   - Faça login com sua conta GitHub

2. **Crie uma nova aplicação:**
   - Clique em "New app"
   - Selecione seu repositório: `SEU_USUARIO/dnd-character-creator`
   - Branch: `main`
   - Main file path: `streamlit_app.py`

3. **Configure a aplicação:**
   - **App URL:** Escolha um nome único (ex: `dnd-character-creator`)
   - **Python version:** 3.8 ou superior
   - **Secrets:** Deixe vazio por enquanto

4. **Deploy:**
   - Clique em "Deploy!"
   - Aguarde o processo de build (2-5 minutos)

### 3. Verificação do Deploy

1. **Acesse sua aplicação:**
   - URL: `https://SEU_APP_NAME.streamlit.app`

2. **Teste as funcionalidades:**
   - ✅ Página inicial carrega
   - ✅ Criação de personagem funciona
   - ✅ Seleção de raça, classe e antecedente
   - ✅ Sistema de habilidades
   - ✅ Salvamento/carregamento
   - ✅ Exportação PDF
   - ✅ Modo escuro
   - ✅ Multilinguagem

## 🔧 Configurações Avançadas

### 1. Variáveis de Ambiente

Se precisar de configurações específicas, adicione no Streamlit Cloud:

```toml
# .streamlit/secrets.toml
[general]
app_name = "D&D 5e Character Creator"
version = "1.0.0"

[database]
# Configurações de banco de dados (se necessário)
```

### 2. Domínio Personalizado

Para usar um domínio personalizado:

1. Configure o domínio no Streamlit Cloud
2. Adicione o DNS necessário
3. Atualize as configurações de CORS se necessário

### 3. Monitoramento

- **Logs:** Acesse a aba "Logs" no Streamlit Cloud
- **Métricas:** Monitore o uso de CPU e memória
- **Erros:** Verifique os logs para problemas

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de importação:**
   - Verifique se todos os arquivos estão no repositório
   - Confirme que o `streamlit_app.py` está na raiz

2. **Dependências não encontradas:**
   - Verifique o `requirements.txt`
   - Confirme as versões das dependências

3. **Erro de permissão:**
   - Verifique se o repositório é público
   - Confirme as permissões do GitHub

4. **Aplicação não carrega:**
   - Verifique os logs no Streamlit Cloud
   - Teste localmente primeiro

### Logs de Debug

Para debug, adicione no código:

```python
import streamlit as st
import logging

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Usar no código
logger.debug("Debug message")
st.write("Debug info")
```

## 📈 Otimizações

### 1. Performance

- **Cache de dados:** Use `@st.cache_data` para dados estáticos
- **Lazy loading:** Carregue dados apenas quando necessário
- **Otimização de imagens:** Comprima imagens se houver

### 2. Segurança

- **Validação de entrada:** Sempre valide dados do usuário
- **Sanitização:** Limpe dados antes de processar
- **Rate limiting:** Implemente se necessário

### 3. Escalabilidade

- **Banco de dados:** Use para muitos usuários
- **CDN:** Para arquivos estáticos
- **Load balancing:** Para alta demanda

## 🔄 Atualizações

### Deploy de Atualizações

1. **Faça as alterações no código**
2. **Commit e push para o GitHub:**
   ```bash
   git add .
   git commit -m "Update: Nova funcionalidade"
   git push origin main
   ```
3. **O Streamlit Cloud atualiza automaticamente**

### Rollback

Se algo der errado:

1. **Reverta o commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```
2. **Ou volte para um commit anterior:**
   ```bash
   git reset --hard COMMIT_HASH
   git push --force origin main
   ```

## 📞 Suporte

- **Streamlit Cloud:** [docs.streamlit.io](https://docs.streamlit.io)
- **GitHub Issues:** Use o sistema de issues do repositório
- **Documentação:** Consulte o README.md

## 🎉 Conclusão

Sua aplicação D&D 5e Character Creator está pronta para uso! 

**URL da aplicação:** `https://SEU_APP_NAME.streamlit.app`

**Funcionalidades disponíveis:**
- ✅ Criação de personagens D&D 5e
- ✅ Interface responsiva com dark mode
- ✅ Multilinguagem (PT/EN)
- ✅ Salvamento/carregamento
- ✅ Exportação PDF
- ✅ Sistema de login
- ✅ Deploy automático

Divirta-se criando personagens! 🎲⚔️