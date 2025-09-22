"""
Sistema de tradução multilinguagem
"""

from typing import Dict, Any


class Translations:
    """
    Classe para gerenciar traduções multilinguagem
    """
    
    def __init__(self):
        """Inicializa o sistema de traduções"""
        self.translations = {
            'pt': {
                'app_title': 'D&D 5e Character Creator',
                'home': 'Início',
                'create_character': 'Criar Personagem',
                'character_sheet': 'Ficha do Personagem',
                'character_name': 'Nome do Personagem',
                'level': 'Nível',
                'race': 'Raça',
                'class': 'Classe',
                'background': 'Antecedente',
                'ability_scores': 'Pontuações de Habilidade',
                'equipment': 'Equipamentos',
                'special_abilities': 'Habilidades Especiais',
                'save_load': 'Salvar/Carregar',
                'str': 'Força',
                'dex': 'Destreza',
                'con': 'Constituição',
                'int': 'Inteligência',
                'wis': 'Sabedoria',
                'cha': 'Carisma',
                'hit_points': 'Pontos de Vida',
                'armor_class': 'Classe de Armadura',
                'speed': 'Velocidade',
                'proficiency_bonus': 'Bônus de Proficiência',
                'create': 'Criar',
                'save': 'Salvar',
                'load': 'Carregar',
                'delete': 'Deletar',
                'export_pdf': 'Exportar PDF',
                'edit': 'Editar',
                'add': 'Adicionar',
                'remove': 'Remover',
                'description': 'Descrição',
                'type': 'Tipo',
                'weight': 'Peso',
                'value': 'Valor',
                'properties': 'Propriedades',
                'notes': 'Notas',
                'dark_mode': 'Modo Escuro',
                'language': 'Idioma',
                'select_race': 'Selecione uma raça...',
                'select_class': 'Selecione uma classe...',
                'select_background': 'Selecione um antecedente...',
                'standard_array': 'Array Padrão',
                'point_buy': 'Compra por Pontos',
                'dice_roll': 'Rolagem de Dados',
                'roll_dice': 'Rolar Dados',
                'total_points': 'Total de pontos usados',
                'points_available': 'pontos disponíveis',
                'points_used': 'pontos usados',
                'points_remaining': 'pontos restantes',
                'success': 'Sucesso',
                'error': 'Erro',
                'info': 'Informação',
                'warning': 'Aviso',
                'character_created': 'Personagem criado com sucesso!',
                'character_saved': 'Personagem salvo com sucesso!',
                'character_loaded': 'Personagem carregado com sucesso!',
                'character_deleted': 'Personagem deletado!',
                'pdf_exported': 'PDF exportado com sucesso!',
                'item_added': 'Item adicionado!',
                'ability_added': 'Habilidade adicionada!',
                'no_character': 'Nenhum personagem carregado.',
                'no_equipment': 'Nenhum equipamento adicionado.',
                'no_abilities': 'Nenhuma habilidade especial adicionada.',
                'enter_name': 'Por favor, insira o nome do personagem!',
                'select_race_error': 'Por favor, selecione uma raça!',
                'select_class_error': 'Por favor, selecione uma classe!',
                'points_exceeded': 'Você usou mais pontos do que tem disponível!',
                'points_remaining_warning': 'Você ainda tem pontos disponíveis.',
                'points_perfect': 'Pontos distribuídos perfeitamente!',
                'welcome_title': 'Bem-vindo ao Sistema de Criação de Fichas de Personagem!',
                'welcome_subtitle': 'Crie e gerencie suas fichas de personagem para Dungeons & Dragons 5ª edição (2024)',
                'features_title': 'Funcionalidades Principais',
                'how_to_use_title': 'Como Usar',
                'technical_info_title': 'Informações Técnicas',
                'start_creating': 'Começar a Criar Personagem',
                'races_available': 'Raças Disponíveis',
                'classes_available': 'Classes Disponíveis',
                'backgrounds_available': 'Antecedentes',
                'features_count': 'Funcionalidades',
                'all_main_races': 'Todas as raças principais',
                'all_main_classes': 'Todas as classes principais',
                'classic_backgrounds': 'Antecedentes clássicos',
                'complete_system': 'Sistema completo',
                'character_creation': 'Criação de Personagens',
                'character_management': 'Gerenciamento de Fichas',
                'ability_system': 'Sistema de Habilidades',
                'export_sharing': 'Exportação e Compartilhamento',
                'developed_with': 'Desenvolvido com',
                'based_on': 'Baseado em',
                'license': 'Licença',
                'step_1': 'Acesse a aba \'Criar Personagem\' para começar um novo personagem',
                'step_2': 'Preencha as informações básicas (nome, nível, raça, classe, antecedente)',
                'step_3': 'Configure as habilidades usando um dos métodos disponíveis',
                'step_4': 'Adicione equipamentos e habilidades especiais conforme necessário',
                'step_5': 'Salve seu personagem para acessá-lo posteriormente',
                'step_6': 'Visualize a ficha completa na aba \'Ficha do Personagem\'',
                'step_7': 'Exporte para PDF quando estiver satisfeito com o resultado'
            },
            'en': {
                'app_title': 'D&D 5e Character Creator',
                'home': 'Home',
                'create_character': 'Create Character',
                'character_sheet': 'Character Sheet',
                'character_name': 'Character Name',
                'level': 'Level',
                'race': 'Race',
                'class': 'Class',
                'background': 'Background',
                'ability_scores': 'Ability Scores',
                'equipment': 'Equipment',
                'special_abilities': 'Special Abilities',
                'save_load': 'Save/Load',
                'str': 'Strength',
                'dex': 'Dexterity',
                'con': 'Constitution',
                'int': 'Intelligence',
                'wis': 'Wisdom',
                'cha': 'Charisma',
                'hit_points': 'Hit Points',
                'armor_class': 'Armor Class',
                'speed': 'Speed',
                'proficiency_bonus': 'Proficiency Bonus',
                'create': 'Create',
                'save': 'Save',
                'load': 'Load',
                'delete': 'Delete',
                'export_pdf': 'Export PDF',
                'edit': 'Edit',
                'add': 'Add',
                'remove': 'Remove',
                'description': 'Description',
                'type': 'Type',
                'weight': 'Weight',
                'value': 'Value',
                'properties': 'Properties',
                'notes': 'Notes',
                'dark_mode': 'Dark Mode',
                'language': 'Language',
                'select_race': 'Select a race...',
                'select_class': 'Select a class...',
                'select_background': 'Select a background...',
                'standard_array': 'Standard Array',
                'point_buy': 'Point Buy',
                'dice_roll': 'Dice Roll',
                'roll_dice': 'Roll Dice',
                'total_points': 'Total points used',
                'points_available': 'points available',
                'points_used': 'points used',
                'points_remaining': 'points remaining',
                'success': 'Success',
                'error': 'Error',
                'info': 'Information',
                'warning': 'Warning',
                'character_created': 'Character created successfully!',
                'character_saved': 'Character saved successfully!',
                'character_loaded': 'Character loaded successfully!',
                'character_deleted': 'Character deleted!',
                'pdf_exported': 'PDF exported successfully!',
                'item_added': 'Item added!',
                'ability_added': 'Ability added!',
                'no_character': 'No character loaded.',
                'no_equipment': 'No equipment added.',
                'no_abilities': 'No special abilities added.',
                'enter_name': 'Please enter the character name!',
                'select_race_error': 'Please select a race!',
                'select_class_error': 'Please select a class!',
                'points_exceeded': 'You used more points than available!',
                'points_remaining_warning': 'You still have points available.',
                'points_perfect': 'Points distributed perfectly!',
                'welcome_title': 'Welcome to the Character Sheet Creation System!',
                'welcome_subtitle': 'Create and manage your character sheets for Dungeons & Dragons 5th Edition (2024)',
                'features_title': 'Main Features',
                'how_to_use_title': 'How to Use',
                'technical_info_title': 'Technical Information',
                'start_creating': 'Start Creating Character',
                'races_available': 'Available Races',
                'classes_available': 'Available Classes',
                'backgrounds_available': 'Backgrounds',
                'features_count': 'Features',
                'all_main_races': 'All main races',
                'all_main_classes': 'All main classes',
                'classic_backgrounds': 'Classic backgrounds',
                'complete_system': 'Complete system',
                'character_creation': 'Character Creation',
                'character_management': 'Character Management',
                'ability_system': 'Ability System',
                'export_sharing': 'Export and Sharing',
                'developed_with': 'Developed with',
                'based_on': 'Based on',
                'license': 'License',
                'step_1': 'Access the \'Create Character\' tab to start a new character',
                'step_2': 'Fill in the basic information (name, level, race, class, background)',
                'step_3': 'Configure abilities using one of the available methods',
                'step_4': 'Add equipment and special abilities as needed',
                'step_5': 'Save your character to access it later',
                'step_6': 'View the complete sheet in the \'Character Sheet\' tab',
                'step_7': 'Export to PDF when satisfied with the result'
            }
        }
    
    def get_text(self, key: str, language: str = 'pt') -> str:
        """
        Obtém uma tradução
        
        Args:
            key: Chave da tradução
            language: Idioma (pt ou en)
            
        Returns:
            Texto traduzido
        """
        return self.translations.get(language, {}).get(key, key)
    
    def get_language(self) -> str:
        """Obtém o idioma atual"""
        return 'pt'  # Por padrão, português
    
    def set_language(self, language: str):
        """Define o idioma atual"""
        if language in self.translations:
            # Aqui você salvaria a preferência do usuário
            pass


# Instância global do sistema de traduções
translations = Translations()