"""
Arquivo principal para o Streamlit Cloud
Este arquivo é usado quando a aplicação é implantada no Streamlit Cloud
"""

import streamlit as st
import sys
import os

# Adiciona o diretório raiz ao path para importar os módulos
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from frontend.utils import setup_page_config, apply_custom_css, create_sidebar
from frontend.character_creator import CharacterCreator
from frontend.character_sheet import CharacterSheet


def main():
    """Função principal da aplicação"""
    # Configura a página
    setup_page_config()
    
    # Aplica CSS customizado
    apply_custom_css()
    
    # Cria a barra lateral
    create_sidebar()
    
    # Inicializa componentes
    character_creator = CharacterCreator()
    character_sheet = CharacterSheet()
    
    # Obtém o personagem atual do session state
    current_character = st.session_state.get('current_character')
    
    # Tabs principais
    tab1, tab2, tab3 = st.tabs([
        "🏠 Início", 
        "⚔️ Criar Personagem", 
        "📋 Ficha do Personagem"
    ])
    
    with tab1:
        render_home_page()
    
    with tab2:
        character_creator.render()
    
    with tab3:
        character_sheet.render(current_character)


def render_home_page():
    """Renderiza a página inicial"""
    st.markdown('<h1 class="main-header">🏰 D&D 5e Character Creator</h1>', unsafe_allow_html=True)
    
    st.markdown("""
    <div style="text-align: center; margin: 2rem 0;">
        <h2>Bem-vindo ao Sistema de Criação de Fichas de Personagem!</h2>
        <p style="font-size: 1.2rem; color: #666;">
            Crie e gerencie suas fichas de personagem para Dungeons & Dragons 5ª edição (2024)
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Estatísticas do sistema
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Raças Disponíveis", "9", "Todas as raças principais")
    
    with col2:
        st.metric("Classes Disponíveis", "12", "Todas as classes principais")
    
    with col3:
        st.metric("Antecedentes", "6", "Antecedentes clássicos")
    
    with col4:
        st.metric("Funcionalidades", "10+", "Sistema completo")
    
    st.markdown("---")
    
    # Funcionalidades principais
    st.markdown('<h2 class="section-header">🎯 Funcionalidades Principais</h2>', unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        **✨ Criação de Personagens**
        - Seleção de raça, classe e antecedente
        - Aplicação automática de regras e bônus
        - Sistema de pontuação de habilidades flexível
        - Equipamentos iniciais automáticos
        
        **📋 Gerenciamento de Fichas**
        - Visualização completa da ficha
        - Salvamento e carregamento em JSON
        - Edição de personagens existentes
        - Sistema de notas personalizadas
        """)
    
    with col2:
        st.markdown("""
        **🎲 Sistema de Habilidades**
        - Array padrão (15, 14, 13, 12, 10, 8)
        - Compra por pontos (27 pontos)
        - Rolagem de dados (4d6, descarte o menor)
        - Cálculo automático de modificadores
        
        **📄 Exportação e Compartilhamento**
        - Exportação para PDF
        - Interface responsiva
        - Modo escuro disponível
        - Código aberto e extensível
        """)
    
    st.markdown("---")
    
    # Como usar
    st.markdown('<h2 class="section-header">🚀 Como Usar</h2>', unsafe_allow_html=True)
    
    steps = [
        "1. **Acesse a aba 'Criar Personagem'** para começar um novo personagem",
        "2. **Preencha as informações básicas** (nome, nível, raça, classe, antecedente)",
        "3. **Configure as habilidades** usando um dos métodos disponíveis",
        "4. **Adicione equipamentos e habilidades especiais** conforme necessário",
        "5. **Salve seu personagem** para acessá-lo posteriormente",
        "6. **Visualize a ficha completa** na aba 'Ficha do Personagem'",
        "7. **Exporte para PDF** quando estiver satisfeito com o resultado"
    ]
    
    for step in steps:
        st.markdown(step)
    
    st.markdown("---")
    
    # Informações técnicas
    st.markdown('<h2 class="section-header">⚙️ Informações Técnicas</h2>', unsafe_allow_html=True)
    
    st.markdown("""
    **Desenvolvido com:**
    - 🐍 Python 3.8+
    - 📊 Streamlit
    - 📄 ReportLab (PDF)
    - 🎨 CSS customizado
    
    **Baseado em:**
    - D&D 5e System Reference Document (SRD)
    - Player's Handbook 2024
    - Regras oficiais da Wizards of the Coast
    
    **Licença:** MIT License
    """)
    
    # Botão para começar
    st.markdown("""
    <div style="text-align: center; margin: 2rem 0;">
        <a href="#criar-personagem" style="text-decoration: none;">
            <button style="
                background-color: #FF6B6B; 
                color: white; 
                border: none; 
                padding: 1rem 2rem; 
                font-size: 1.2rem; 
                border-radius: 10px; 
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            ">
                🎯 Começar a Criar Personagem
            </button>
        </a>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()