"""
Script de demonstração do sistema D&D 5e Character Creator
"""

import sys
import os

# Adiciona o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.character import Character
from backend.race import Race
from backend.class_ import CharacterClass
from backend.background import Background
from backend.data_manager import DataManager
from backend.character_manager import CharacterManager
from backend.pdf_exporter import PDFExporter


def create_demo_character():
    """Cria um personagem de demonstração"""
    print("🎲 Criando personagem de demonstração...")
    
    # Inicializa o gerenciador de dados
    data_manager = DataManager()
    
    # Obtém dados
    race = data_manager.get_race_by_name("Human")
    char_class = data_manager.get_class_by_name("Fighter")
    background = data_manager.get_background_by_name("Soldier")
    
    # Cria o personagem
    character = Character(
        name="Aragorn",
        level=5,
        race=race,
        character_class=char_class,
        background=background,
        ability_scores={
            'str': 16, 'dex': 14, 'con': 15,
            'int': 12, 'wis': 13, 'cha': 10
        }
    )
    
    # Aplica bônus da raça
    character.apply_race_bonuses()
    
    # Calcula pontos de vida e CA
    character.hit_points = character.calculate_hit_points()
    character.armor_class = character.calculate_armor_class()
    
    print(f"✅ Personagem criado: {character.name}")
    print(f"   Nível: {character.level}")
    print(f"   Raça: {character.race.name}")
    print(f"   Classe: {character.character_class.name}")
    print(f"   Antecedente: {character.background.name}")
    print(f"   Pontos de Vida: {character.hit_points}")
    print(f"   Classe de Armadura: {character.armor_class}")
    
    return character


def test_character_management():
    """Testa o sistema de gerenciamento de personagens"""
    print("\n💾 Testando gerenciamento de personagens...")
    
    character_manager = CharacterManager()
    
    # Cria um personagem de teste
    character = create_demo_character()
    
    # Salva o personagem
    filename = character_manager.save_character(character)
    print(f"✅ Personagem salvo como: {filename}")
    
    # Lista personagens
    characters = character_manager.list_characters()
    print(f"📋 Personagens salvos: {len(characters)}")
    
    for char in characters:
        print(f"   - {char['name']} (Level {char['level']} {char['race']} {char['class']})")
    
    return character


def test_pdf_export(character):
    """Testa a exportação para PDF"""
    print("\n📄 Testando exportação PDF...")
    
    pdf_exporter = PDFExporter()
    
    try:
        filename = f"{character.name}_demo.pdf"
        filepath = pdf_exporter.export_character(character, filename)
        print(f"✅ PDF exportado: {filepath}")
        
        # Verifica se o arquivo foi criado
        if os.path.exists(filepath):
            file_size = os.path.getsize(filepath)
            print(f"   Tamanho do arquivo: {file_size} bytes")
        else:
            print("❌ Arquivo PDF não foi criado")
            
    except Exception as e:
        print(f"❌ Erro ao exportar PDF: {e}")


def test_data_loading():
    """Testa o carregamento de dados"""
    print("\n📚 Testando carregamento de dados...")
    
    data_manager = DataManager()
    
    # Testa raças
    races = data_manager.load_races()
    print(f"✅ Raças carregadas: {len(races)}")
    
    # Testa classes
    classes = data_manager.load_classes()
    print(f"✅ Classes carregadas: {len(classes)}")
    
    # Testa antecedentes
    backgrounds = data_manager.load_backgrounds()
    print(f"✅ Antecedentes carregados: {len(backgrounds)}")
    
    # Mostra algumas informações
    print("\n📋 Exemplos de dados:")
    print(f"   Primeira raça: {races[0].name}")
    print(f"   Primeira classe: {classes[0].name}")
    print(f"   Primeiro antecedente: {backgrounds[0].name}")


def main():
    """Função principal de demonstração"""
    print("🏰 D&D 5e Character Creator - Demonstração")
    print("=" * 50)
    
    try:
        # Testa carregamento de dados
        test_data_loading()
        
        # Testa gerenciamento de personagens
        character = test_character_management()
        
        # Testa exportação PDF
        test_pdf_export(character)
        
        print("\n🎉 Demonstração concluída com sucesso!")
        print("\nPara executar a aplicação web, use:")
        print("   streamlit run app.py")
        
    except Exception as e:
        print(f"\n❌ Erro durante a demonstração: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()