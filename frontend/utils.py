"""
Utilitários para o frontend Streamlit
"""

import streamlit as st
from typing import Dict, Any
import sys
import os

# Adiciona o diretório raiz ao path para importar os módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.translations import translations


def setup_page_config():
    """Configura a página do Streamlit"""
    st.set_page_config(
        page_title="D&D 5e Character Creator",
        page_icon="⚔️",
        layout="wide",
        initial_sidebar_state="expanded"
    )


def get_theme_config() -> Dict[str, Any]:
    """Retorna configuração do tema baseada na preferência do usuário"""
    # Verifica se o usuário prefere dark mode
    dark_mode = st.session_state.get('dark_mode', False)
    
    if dark_mode:
        return {
            'primaryColor': '#FF6B6B',
            'backgroundColor': '#0E1117',
            'secondaryBackgroundColor': '#262730',
            'textColor': '#FAFAFA'
        }
    else:
        return {
            'primaryColor': '#FF6B6B',
            'backgroundColor': '#FFFFFF',
            'secondaryBackgroundColor': '#F0F2F6',
            'textColor': '#262730'
        }


def apply_custom_css():
    """Aplica CSS customizado para melhorar a aparência"""
    st.markdown("""
    <style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 2rem;
        color: #FF6B6B;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .section-header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #FF6B6B;
        border-bottom: 2px solid #FF6B6B;
        padding-bottom: 0.5rem;
    }
    
    .character-card {
        background-color: #f8f9fa;
        border: 2px solid #dee2e6;
        border-radius: 10px;
        padding: 1rem;
        margin: 0.5rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .character-card:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .stat-box {
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        border-radius: 5px;
        padding: 0.5rem;
        text-align: center;
        margin: 0.25rem;
    }
    
    .stat-value {
        font-size: 1.2rem;
        font-weight: bold;
        color: #495057;
    }
    
    .stat-label {
        font-size: 0.8rem;
        color: #6c757d;
        text-transform: uppercase;
    }
    
    .success-message {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        color: #155724;
    }
    
    .error-message {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        color: #721c24;
    }
    
    .info-message {
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        color: #0c5460;
    }
    
    .sidebar .sidebar-content {
        background-color: #f8f9fa;
    }
    
    .stButton > button {
        background-color: #FF6B6B;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .stButton > button:hover {
        background-color: #FF5252;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .stSelectbox > div > div {
        background-color: white;
    }
    
    .stTextInput > div > div > input {
        background-color: white;
    }
    
    .stTextArea > div > div > textarea {
        background-color: white;
    }
    </style>
    """, unsafe_allow_html=True)


def show_message(message: str, message_type: str = "info"):
    """
    Mostra uma mensagem na interface
    
    Args:
        message: Texto da mensagem
        message_type: Tipo da mensagem (success, error, info)
    """
    if message_type == "success":
        st.markdown(f'<div class="success-message">{message}</div>', unsafe_allow_html=True)
    elif message_type == "error":
        st.markdown(f'<div class="error-message">{message}</div>', unsafe_allow_html=True)
    else:
        st.markdown(f'<div class="info-message">{message}</div>', unsafe_allow_html=True)


def create_sidebar():
    """Cria a barra lateral com configurações"""
    with st.sidebar:
        st.title("⚙️ Configurações")
        
        # Seleção de idioma
        language = st.selectbox(
            "🌐 Idioma / Language",
            ["pt", "en"],
            index=0 if st.session_state.get('language', 'pt') == 'pt' else 1,
            format_func=lambda x: "Português" if x == "pt" else "English"
        )
        st.session_state['language'] = language
        
        # Toggle para dark mode
        dark_mode = st.checkbox("🌙 Modo Escuro", value=st.session_state.get('dark_mode', False))
        st.session_state['dark_mode'] = dark_mode
        
        st.markdown("---")
        
        # Sistema de login
        if not st.session_state.get('logged_in', False):
            st.markdown("### 🔐 Login")
            
            with st.form("login_form"):
                username = st.text_input("Usuário")
                password = st.text_input("Senha", type="password")
                login_submitted = st.form_submit_button("Entrar")
                
                if login_submitted and username and password:
                    # Aqui você implementaria a autenticação real
                    if username == "admin" and password == "admin":
                        st.session_state['logged_in'] = True
                        st.session_state['current_user'] = username
                        st.success("Login realizado com sucesso!")
                        st.rerun()
                    else:
                        st.error("Usuário ou senha incorretos!")
            
            st.markdown("---")
        else:
            st.markdown("### 👤 Usuário")
            st.markdown(f"**Logado como:** {st.session_state.get('current_user', 'Unknown')}")
            
            if st.button("🚪 Sair"):
                st.session_state['logged_in'] = False
                st.session_state['current_user'] = None
                st.rerun()
            
            st.markdown("---")
        
        # Informações sobre o sistema
        st.markdown("### 📖 Sobre")
        st.markdown("""
        **D&D 5e Character Creator**
        
        Sistema completo para criação de fichas de personagem para Dungeons & Dragons 5ª edição (2024).
        
        **Funcionalidades:**
        - ✅ Criação de personagens
        - ✅ Seleção de raça, classe e antecedente
        - ✅ Aplicação automática de regras
        - ✅ Salvamento/carregamento
        - ✅ Exportação PDF
        - ✅ Interface responsiva
        """)
        
        st.markdown("---")
        
        # Links úteis
        st.markdown("### 🔗 Links Úteis")
        st.markdown("""
        - [D&D 5e SRD](https://dnd.wizards.com/resources/systems-reference-document)
        - [Streamlit Docs](https://docs.streamlit.io/)
        - [GitHub Repository](#)
        """)


def get_text(key: str) -> str:
    """
    Obtém uma tradução baseada no idioma atual
    
    Args:
        key: Chave da tradução
        
    Returns:
        Texto traduzido
    """
    language = st.session_state.get('language', 'pt')
    return translations.get_text(key, language)