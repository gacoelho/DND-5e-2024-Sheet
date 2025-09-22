"""
Componente de exibição da ficha de personagem
"""

import streamlit as st
from typing import Optional, Dict, Any
import sys
import os

# Adiciona o diretório raiz ao path para importar os módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.character import Character
from backend.pdf_exporter import PDFExporter
from .utils import show_message


class CharacterSheet:
    """
    Classe para exibição da ficha de personagem
    """
    
    def __init__(self):
        """Inicializa o visualizador de ficha"""
        self.pdf_exporter = PDFExporter()
    
    def render(self, character: Optional[Character] = None):
        """
        Renderiza a ficha do personagem
        
        Args:
            character: Personagem a ser exibido
        """
        if not character:
            st.markdown('<h1 class="main-header">📋 Ficha de Personagem</h1>', unsafe_allow_html=True)
            st.info("Nenhum personagem carregado. Vá para a aba 'Criar Personagem' para criar um novo personagem.")
            return
        
        st.markdown(f'<h1 class="main-header">📋 {character.name}</h1>', unsafe_allow_html=True)
        
        # Botões de ação
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            if st.button("🔄 Atualizar Ficha", type="primary"):
                st.rerun()
        
        with col2:
            if st.button("📄 Exportar PDF"):
                self._export_to_pdf(character)
        
        with col3:
            if st.button("✏️ Editar Personagem"):
                st.session_state['edit_mode'] = True
                st.rerun()
        
        with col4:
            if st.button("🗑️ Deletar Personagem"):
                self._delete_character(character)
        
        st.markdown("---")
        
        # Informações básicas
        self._render_basic_info(character)
        
        # Habilidades
        self._render_ability_scores(character)
        
        # Equipamentos
        self._render_equipment(character)
        
        # Habilidades especiais
        self._render_special_abilities(character)
        
        # Notas
        self._render_notes(character)
    
    def _render_basic_info(self, character: Character):
        """Renderiza informações básicas do personagem"""
        st.markdown('<h2 class="section-header">Informações Básicas</h2>', unsafe_allow_html=True)
        
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown(f"**Nível:** {character.level}")
            st.markdown(f"**Raça:** {character.race.name if character.race else 'Não definida'}")
        
        with col2:
            st.markdown(f"**Classe:** {character.character_class.name if character.character_class else 'Não definida'}")
            st.markdown(f"**Antecedente:** {character.background.name if character.background else 'Não definido'}")
        
        with col3:
            st.markdown(f"**Pontos de Vida:** {character.hit_points}")
            st.markdown(f"**Classe de Armadura:** {character.armor_class}")
        
        with col4:
            st.markdown(f"**Velocidade:** {character.speed} pés")
            st.markdown(f"**Bônus de Proficiência:** +{character.get_proficiency_bonus()}")
    
    def _render_ability_scores(self, character: Character):
        """Renderiza as pontuações de habilidade"""
        st.markdown('<h2 class="section-header">Habilidades</h2>', unsafe_allow_html=True)
        
        abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
        ability_names = {
            'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
            'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
        }
        
        ability_modifiers = character.get_ability_modifiers()
        
        cols = st.columns(6)
        
        for i, ability in enumerate(abilities):
            with cols[i]:
                score = character.ability_scores.get(ability, 10)
                modifier = ability_modifiers.get(ability, 0)
                modifier_str = f"+{modifier}" if modifier >= 0 else str(modifier)
                
                st.markdown(f"""
                <div class="stat-box">
                    <div class="stat-label">{ability_names[ability]}</div>
                    <div class="stat-value">{score}</div>
                    <div class="stat-label">({modifier_str})</div>
                </div>
                """, unsafe_allow_html=True)
    
    def _render_equipment(self, character: Character):
        """Renderiza os equipamentos do personagem"""
        st.markdown('<h2 class="section-header">Equipamentos</h2>', unsafe_allow_html=True)
        
        if not character.equipment:
            st.info("Nenhum equipamento adicionado.")
            return
        
        # Agrupa equipamentos por tipo
        equipment_by_type = {}
        for item in character.equipment:
            if item.item_type not in equipment_by_type:
                equipment_by_type[item.item_type] = []
            equipment_by_type[item.item_type].append(item)
        
        for item_type, items in equipment_by_type.items():
            st.markdown(f"**{item_type.title()}:**")
            
            for item in items:
                with st.expander(f"{item.name}"):
                    if item.description:
                        st.markdown(f"**Descrição:** {item.description}")
                    
                    col1, col2, col3 = st.columns(3)
                    
                    with col1:
                        if item.weight > 0:
                            st.markdown(f"**Peso:** {item.weight} lb")
                    
                    with col2:
                        if item.value:
                            st.markdown(f"**Valor:** {item.value}")
                    
                    with col3:
                        if item.properties:
                            st.markdown(f"**Propriedades:** {', '.join(item.properties)}")
    
    def _render_special_abilities(self, character: Character):
        """Renderiza as habilidades especiais do personagem"""
        st.markdown('<h2 class="section-header">Habilidades Especiais</h2>', unsafe_allow_html=True)
        
        if not character.abilities:
            st.info("Nenhuma habilidade especial adicionada.")
            return
        
        # Agrupa habilidades por tipo
        abilities_by_type = {}
        for ability in character.abilities:
            if ability.ability_type not in abilities_by_type:
                abilities_by_type[ability.ability_type] = []
            abilities_by_type[ability.ability_type].append(ability)
        
        for ability_type, abilities in abilities_by_type.items():
            st.markdown(f"**{ability_type.title()}:**")
            
            for ability in abilities:
                with st.expander(f"{ability.name}"):
                    if ability.description:
                        st.markdown(ability.description)
    
    def _render_notes(self, character: Character):
        """Renderiza as notas do personagem"""
        if character.notes:
            st.markdown('<h2 class="section-header">Notas</h2>', unsafe_allow_html=True)
            st.markdown(character.notes)
    
    def _export_to_pdf(self, character: Character):
        """Exporta o personagem para PDF"""
        try:
            filename = f"{character.name.replace(' ', '_')}_ficha.pdf"
            filepath = self.pdf_exporter.export_character(character, filename)
            
            with open(filepath, "rb") as pdf_file:
                st.download_button(
                    label="📄 Baixar PDF",
                    data=pdf_file.read(),
                    file_name=filename,
                    mime="application/pdf"
                )
            
            show_message(f"PDF exportado com sucesso: {filename}", "success")
            
        except Exception as e:
            show_message(f"Erro ao exportar PDF: {e}", "error")
    
    def _delete_character(self, character: Character):
        """Deleta o personagem atual"""
        if st.button("⚠️ Confirmar Exclusão", type="secondary"):
            # Aqui você implementaria a lógica de exclusão
            # Por enquanto, apenas limpa o session state
            if 'current_character' in st.session_state:
                del st.session_state['current_character']
            
            show_message("Personagem deletado!", "success")
            st.rerun()