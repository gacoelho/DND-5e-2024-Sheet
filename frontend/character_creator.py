"""
Componente de criação de personagem
"""

import streamlit as st
from typing import Optional, Dict, Any
import sys
import os

# Adiciona o diretório raiz ao path para importar os módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.character import Character
from backend.race import Race
from backend.class_ import CharacterClass
from backend.background import Background
from backend.item import Item
from backend.ability import Ability
from backend.data_manager import DataManager
from backend.character_manager import CharacterManager
from .utils import show_message


class CharacterCreator:
    """
    Classe para criação de personagens
    """
    
    def __init__(self):
        """Inicializa o criador de personagens"""
        self.data_manager = DataManager()
        self.character_manager = CharacterManager()
        self.character = None
    
    def render(self):
        """Renderiza a interface de criação de personagem"""
        st.markdown('<h1 class="main-header">⚔️ Criador de Personagem D&D 5e</h1>', unsafe_allow_html=True)
        
        # Tabs para diferentes seções
        tab1, tab2, tab3, tab4, tab5 = st.tabs([
            "📝 Informações Básicas", 
            "🎲 Habilidades", 
            "⚔️ Equipamentos", 
            "✨ Habilidades Especiais", 
            "💾 Salvar/Carregar"
        ])
        
        with tab1:
            self._render_basic_info()
        
        with tab2:
            self._render_ability_scores()
        
        with tab3:
            self._render_equipment()
        
        with tab4:
            self._render_special_abilities()
        
        with tab5:
            self._render_save_load()
    
    def _render_basic_info(self):
        """Renderiza a seção de informações básicas"""
        st.markdown('<h2 class="section-header">Informações Básicas</h2>', unsafe_allow_html=True)
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Nome do personagem
            name = st.text_input("Nome do Personagem", value=st.session_state.get('character_name', ''))
            st.session_state['character_name'] = name
            
            # Nível
            level = st.number_input("Nível", min_value=1, max_value=20, value=st.session_state.get('character_level', 1))
            st.session_state['character_level'] = level
            
            # Raça
            races = self.data_manager.get_race_names()
            selected_race = st.selectbox("Raça", ["Selecione uma raça..."] + races, 
                                       index=st.session_state.get('selected_race_index', 0))
            
            if selected_race != "Selecione uma raça...":
                race_index = races.index(selected_race)
                st.session_state['selected_race_index'] = race_index + 1
                race = self.data_manager.get_race_by_name(selected_race)
                
                if race:
                    st.markdown(f"**Descrição:** {race.description}")
                    st.markdown(f"**Tamanho:** {race.size}")
                    st.markdown(f"**Velocidade:** {race.speed} pés")
                    
                    if race.ability_score_increases:
                        st.markdown("**Bônus de Habilidade:**")
                        for ability, bonus in race.ability_score_increases.items():
                            ability_name = {
                                'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
                                'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
                            }[ability]
                            st.markdown(f"- {ability_name}: +{bonus}")
        
        with col2:
            # Classe
            classes = self.data_manager.get_class_names()
            selected_class = st.selectbox("Classe", ["Selecione uma classe..."] + classes,
                                        index=st.session_state.get('selected_class_index', 0))
            
            if selected_class != "Selecione uma classe...":
                class_index = classes.index(selected_class)
                st.session_state['selected_class_index'] = class_index + 1
                char_class = self.data_manager.get_class_by_name(selected_class)
                
                if char_class:
                    st.markdown(f"**Dado de Vida:** d{char_class.hit_die}")
                    st.markdown(f"**Habilidade Primária:** {char_class.primary_ability.upper()}")
                    st.markdown(f"**Magia:** {'Sim' if char_class.spellcasting else 'Não'}")
                    
                    if char_class.saving_throw_proficiencies:
                        st.markdown("**Proficiências em Salvamentos:**")
                        for prof in char_class.saving_throw_proficiencies:
                            st.markdown(f"- {prof.upper()}")
            
            # Antecedente
            backgrounds = self.data_manager.get_background_names()
            selected_background = st.selectbox("Antecedente", ["Selecione um antecedente..."] + backgrounds,
                                             index=st.session_state.get('selected_background_index', 0))
            
            if selected_background != "Selecione um antecedente...":
                bg_index = backgrounds.index(selected_background)
                st.session_state['selected_background_index'] = bg_index + 1
                background = self.data_manager.get_background_by_name(selected_background)
                
                if background:
                    st.markdown(f"**Descrição:** {background.description}")
                    
                    if background.skill_proficiencies:
                        st.markdown("**Proficiências em Perícias:**")
                        for skill in background.skill_proficiencies:
                            st.markdown(f"- {skill}")
        
        # Botão para criar personagem
        if st.button("🎯 Criar Personagem", type="primary"):
            self._create_character()
    
    def _render_ability_scores(self):
        """Renderiza a seção de pontuações de habilidade"""
        st.markdown('<h2 class="section-header">Pontuações de Habilidade</h2>', unsafe_allow_html=True)
        
        st.markdown("""
        **Método de Geração:**
        - **Padrão:** 15, 14, 13, 12, 10, 8
        - **Pontos:** 27 pontos para distribuir
        - **Dados:** 4d6, descarte o menor
        """)
        
        method = st.radio("Escolha o método:", ["Padrão", "Pontos", "Dados"], horizontal=True)
        
        if method == "Padrão":
            self._render_standard_array()
        elif method == "Pontos":
            self._render_point_buy()
        else:
            self._render_dice_roll()
    
    def _render_standard_array(self):
        """Renderiza o método de array padrão"""
        st.markdown("**Array Padrão: 15, 14, 13, 12, 10, 8**")
        
        abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
        ability_names = {
            'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
            'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
        }
        
        standard_values = [15, 14, 13, 12, 10, 8]
        used_values = set()
        
        col1, col2, col3 = st.columns(3)
        
        for i, ability in enumerate(abilities):
            with col1 if i < 2 else col2 if i < 4 else col3:
                available_values = [v for v in standard_values if v not in used_values]
                selected_value = st.selectbox(
                    f"{ability_names[ability]}",
                    available_values,
                    key=f"standard_{ability}"
                )
                used_values.add(selected_value)
                st.session_state[f'ability_{ability}'] = selected_value
    
    def _render_point_buy(self):
        """Renderiza o método de compra por pontos"""
        st.markdown("**Sistema de Pontos (27 pontos total)**")
        
        abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
        ability_names = {
            'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
            'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
        }
        
        # Custo por ponto
        cost_table = {
            8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 10
        }
        
        col1, col2, col3 = st.columns(3)
        total_cost = 0
        
        for i, ability in enumerate(abilities):
            with col1 if i < 2 else col2 if i < 4 else col3:
                value = st.slider(
                    f"{ability_names[ability]}",
                    min_value=8,
                    max_value=18,
                    value=st.session_state.get(f'ability_{ability}', 10),
                    key=f"point_buy_{ability}"
                )
                cost = cost_table[value]
                total_cost += cost
                st.markdown(f"**Custo:** {cost} pontos")
                st.session_state[f'ability_{ability}'] = value
        
        st.markdown(f"**Total de pontos usados:** {total_cost}/27")
        
        if total_cost > 27:
            st.error(f"Você usou {total_cost} pontos, mas só tem 27 disponíveis!")
        elif total_cost < 27:
            st.warning(f"Você ainda tem {27 - total_cost} pontos disponíveis.")
        else:
            st.success("Pontos distribuídos perfeitamente!")
    
    def _render_dice_roll(self):
        """Renderiza o método de rolagem de dados"""
        st.markdown("**Rolagem de Dados (4d6, descarte o menor)**")
        
        if st.button("🎲 Rolar Dados"):
            import random
            
            abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
            ability_names = {
                'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
                'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
            }
            
            col1, col2, col3 = st.columns(3)
            
            for i, ability in enumerate(abilities):
                with col1 if i < 2 else col2 if i < 4 else col3:
                    # Rola 4d6
                    rolls = [random.randint(1, 6) for _ in range(4)]
                    # Remove o menor
                    rolls.remove(min(rolls))
                    # Soma os 3 maiores
                    total = sum(rolls)
                    
                    st.markdown(f"**{ability_names[ability]}:** {total}")
                    st.markdown(f"Rolagens: {rolls} (menor descartado)")
                    st.session_state[f'ability_{ability}'] = total
    
    def _render_equipment(self):
        """Renderiza a seção de equipamentos"""
        st.markdown('<h2 class="section-header">Equipamentos</h2>', unsafe_allow_html=True)
        
        # Equipamentos da classe
        if st.session_state.get('selected_class_index', 0) > 0:
            classes = self.data_manager.get_class_names()
            selected_class = classes[st.session_state['selected_class_index'] - 1]
            char_class = self.data_manager.get_class_by_name(selected_class)
            
            if char_class and char_class.equipment:
                st.markdown("**Equipamentos Iniciais da Classe:**")
                for item in char_class.equipment:
                    st.markdown(f"- **{item.name}** ({item.item_type})")
                    if item.description:
                        st.markdown(f"  - {item.description}")
                    if item.weight > 0:
                        st.markdown(f"  - Peso: {item.weight} lb")
                    if item.value:
                        st.markdown(f"  - Valor: {item.value}")
        
        # Adicionar equipamentos manuais
        st.markdown("**Adicionar Equipamentos:**")
        
        col1, col2 = st.columns(2)
        
        with col1:
            item_name = st.text_input("Nome do Item")
            item_type = st.selectbox("Tipo", ["weapon", "armor", "tool", "equipment", "general"])
            item_description = st.text_area("Descrição")
        
        with col2:
            item_weight = st.number_input("Peso (lb)", min_value=0.0, value=0.0)
            item_value = st.text_input("Valor")
            item_properties = st.text_input("Propriedades (separadas por vírgula)")
        
        if st.button("➕ Adicionar Item"):
            if item_name:
                properties = [p.strip() for p in item_properties.split(',') if p.strip()] if item_properties else []
                
                item = Item(
                    name=item_name,
                    item_type=item_type,
                    description=item_description,
                    weight=item_weight,
                    value=item_value,
                    properties=properties
                )
                
                if 'manual_equipment' not in st.session_state:
                    st.session_state['manual_equipment'] = []
                
                st.session_state['manual_equipment'].append(item)
                show_message(f"Item '{item_name}' adicionado!", "success")
                st.rerun()
    
    def _render_special_abilities(self):
        """Renderiza a seção de habilidades especiais"""
        st.markdown('<h2 class="section-header">Habilidades Especiais</h2>', unsafe_allow_html=True)
        
        # Habilidades da raça
        if st.session_state.get('selected_race_index', 0) > 0:
            races = self.data_manager.get_race_names()
            selected_race = races[st.session_state['selected_race_index'] - 1]
            race = self.data_manager.get_race_by_name(selected_race)
            
            if race and race.features:
                st.markdown("**Habilidades da Raça:**")
                for feature in race.features:
                    st.markdown(f"- **{feature.name}:** {feature.description}")
        
        # Habilidades da classe
        if st.session_state.get('selected_class_index', 0) > 0:
            classes = self.data_manager.get_class_names()
            selected_class = classes[st.session_state['selected_class_index'] - 1]
            char_class = self.data_manager.get_class_by_name(selected_class)
            
            if char_class and char_class.features:
                st.markdown("**Habilidades da Classe:**")
                for feature in char_class.features:
                    st.markdown(f"- **{feature.name}:** {feature.description}")
        
        # Adicionar habilidades manuais
        st.markdown("**Adicionar Habilidades:**")
        
        col1, col2 = st.columns(2)
        
        with col1:
            ability_name = st.text_input("Nome da Habilidade")
            ability_type = st.selectbox("Tipo", ["general", "racial", "class", "background", "feat"])
        
        with col2:
            ability_description = st.text_area("Descrição da Habilidade")
        
        if st.button("➕ Adicionar Habilidade"):
            if ability_name:
                ability = Ability(
                    name=ability_name,
                    description=ability_description,
                    ability_type=ability_type
                )
                
                if 'manual_abilities' not in st.session_state:
                    st.session_state['manual_abilities'] = []
                
                st.session_state['manual_abilities'].append(ability)
                show_message(f"Habilidade '{ability_name}' adicionada!", "success")
                st.rerun()
    
    def _render_save_load(self):
        """Renderiza a seção de salvar/carregar"""
        st.markdown('<h2 class="section-header">Salvar/Carregar Personagem</h2>', unsafe_allow_html=True)
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Salvar Personagem**")
            
            if st.button("💾 Salvar Personagem Atual"):
                if self.character:
                    filename = self.character_manager.save_character(self.character)
                    show_message(f"Personagem salvo como '{filename}'!", "success")
                else:
                    show_message("Nenhum personagem para salvar!", "error")
        
        with col2:
            st.markdown("**Carregar Personagem**")
            
            # Lista personagens salvos
            characters = self.character_manager.list_characters()
            
            if characters:
                character_options = [f"{char['name']} (Level {char['level']} {char['race']} {char['class']})" for char in characters]
                selected_char = st.selectbox("Selecione um personagem:", character_options)
                
                if selected_char and st.button("📂 Carregar Personagem"):
                    char_index = character_options.index(selected_char)
                    filename = characters[char_index]['filename']
                    
                    try:
                        self.character = self.character_manager.load_character(filename)
                        st.session_state['current_character'] = self.character
                        show_message(f"Personagem '{self.character.name}' carregado!", "success")
                        st.rerun()
                    except Exception as e:
                        show_message(f"Erro ao carregar personagem: {e}", "error")
            else:
                st.info("Nenhum personagem salvo encontrado.")
    
    def _create_character(self):
        """Cria um novo personagem com base nas seleções"""
        try:
            # Verifica se todas as informações necessárias foram fornecidas
            if not st.session_state.get('character_name'):
                show_message("Por favor, insira o nome do personagem!", "error")
                return
            
            if st.session_state.get('selected_race_index', 0) == 0:
                show_message("Por favor, selecione uma raça!", "error")
                return
            
            if st.session_state.get('selected_class_index', 0) == 0:
                show_message("Por favor, selecione uma classe!", "error")
                return
            
            # Obtém os dados selecionados
            races = self.data_manager.get_race_names()
            classes = self.data_manager.get_class_names()
            backgrounds = self.data_manager.get_background_names()
            
            selected_race = races[st.session_state['selected_race_index'] - 1]
            selected_class = classes[st.session_state['selected_class_index'] - 1]
            selected_background = backgrounds[st.session_state['selected_background_index'] - 1] if st.session_state.get('selected_background_index', 0) > 0 else None
            
            # Cria o personagem
            character = Character(
                name=st.session_state['character_name'],
                level=st.session_state['character_level'],
                race=self.data_manager.get_race_by_name(selected_race),
                character_class=self.data_manager.get_class_by_name(selected_class),
                background=self.data_manager.get_background_by_name(selected_background) if selected_background else None
            )
            
            # Define as habilidades
            abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
            for ability in abilities:
                if f'ability_{ability}' in st.session_state:
                    character.ability_scores[ability] = st.session_state[f'ability_{ability}']
            
            # Aplica bônus da raça
            character.apply_race_bonuses()
            
            # Calcula pontos de vida e CA
            character.hit_points = character.calculate_hit_points()
            character.armor_class = character.calculate_armor_class()
            
            # Adiciona equipamentos manuais
            if 'manual_equipment' in st.session_state:
                character.equipment.extend(st.session_state['manual_equipment'])
            
            # Adiciona habilidades manuais
            if 'manual_abilities' in st.session_state:
                character.abilities.extend(st.session_state['manual_abilities'])
            
            # Salva no session state
            self.character = character
            st.session_state['current_character'] = character
            
            show_message(f"Personagem '{character.name}' criado com sucesso!", "success")
            
        except Exception as e:
            show_message(f"Erro ao criar personagem: {e}", "error")