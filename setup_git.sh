#!/bin/bash

# Script para configurar o repositório Git e fazer deploy no GitHub

echo "🚀 Configurando repositório Git para D&D 5e Character Creator..."

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositório Git..."
    git init
    git branch -M main
fi

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos ao Git..."
git add .

# Fazer commit inicial
echo "💾 Fazendo commit inicial..."
git commit -m "🎲 Initial commit: D&D 5e Character Creator

✨ Features:
- Sistema completo de criação de personagens D&D 5e
- Interface responsiva com dark mode
- Suporte multilíngua (PT/EN)
- Salvamento/carregamento em JSON
- Exportação para PDF
- Deploy configurado para Streamlit Cloud

🚀 Ready for deployment!"

echo "✅ Repositório configurado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie um repositório no GitHub: https://github.com/new"
echo "2. Execute os comandos abaixo para conectar e fazer push:"
echo ""
echo "   git remote add origin https://github.com/SEU_USUARIO/dnd-character-creator.git"
echo "   git push -u origin main"
echo ""
echo "3. Acesse https://share.streamlit.io para fazer deploy no Streamlit Cloud"
echo ""
echo "🎯 Sua aplicação estará disponível em: https://SEU_APP_NAME.streamlit.app"