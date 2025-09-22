"""
Gerenciador de personagens para o sistema D&D 5e
"""

import json
import os
from typing import Dict, List, Optional
from datetime import datetime
from .character import Character


class CharacterManager:
    """
    Classe para gerenciar salvamento e carregamento de personagens
    """
    
    def __init__(self, save_dir: str = "saves"):
        """
        Inicializa o gerenciador de personagens
        
        Args:
            save_dir: Diretório onde salvar os arquivos de personagem
        """
        self.save_dir = save_dir
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
    
    def save_character(self, character: Character, filename: Optional[str] = None) -> str:
        """
        Salva um personagem em arquivo JSON
        
        Args:
            character: Personagem a ser salvo
            filename: Nome do arquivo (opcional)
            
        Returns:
            Nome do arquivo onde foi salvo
        """
        if filename is None:
            # Gera nome baseado no nome do personagem e timestamp
            safe_name = "".join(c for c in character.name if c.isalnum() or c in (' ', '-', '_')).rstrip()
            safe_name = safe_name.replace(' ', '_')
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{safe_name}_{timestamp}.json"
        
        # Garante que o arquivo tenha extensão .json
        if not filename.endswith('.json'):
            filename += '.json'
        
        filepath = os.path.join(self.save_dir, filename)
        
        # Atualiza timestamp de modificação
        character.updated_at = datetime.now().isoformat()
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(character.to_dict(), f, indent=2, ensure_ascii=False)
        
        return filename
    
    def load_character(self, filename: str) -> Character:
        """
        Carrega um personagem de arquivo JSON
        
        Args:
            filename: Nome do arquivo
            
        Returns:
            Personagem carregado
        """
        if not filename.endswith('.json'):
            filename += '.json'
        
        filepath = os.path.join(self.save_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        return Character.from_dict(data)
    
    def list_characters(self) -> List[Dict[str, str]]:
        """
        Lista todos os personagens salvos
        
        Returns:
            Lista de dicionários com informações dos personagens
        """
        characters = []
        
        for filename in os.listdir(self.save_dir):
            if filename.endswith('.json'):
                try:
                    filepath = os.path.join(self.save_dir, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    
                    characters.append({
                        'filename': filename,
                        'name': data.get('name', 'Unknown'),
                        'level': data.get('level', 1),
                        'race': data.get('race', {}).get('name', 'Unknown') if data.get('race') else 'Unknown',
                        'class': data.get('character_class', {}).get('name', 'Unknown') if data.get('character_class') else 'Unknown',
                        'created_at': data.get('created_at', ''),
                        'updated_at': data.get('updated_at', '')
                    })
                except Exception as e:
                    print(f"Erro ao carregar personagem {filename}: {e}")
                    continue
        
        # Ordena por data de modificação (mais recente primeiro)
        characters.sort(key=lambda x: x['updated_at'], reverse=True)
        
        return characters
    
    def delete_character(self, filename: str) -> bool:
        """
        Deleta um personagem salvo
        
        Args:
            filename: Nome do arquivo
            
        Returns:
            True se deletado com sucesso, False caso contrário
        """
        if not filename.endswith('.json'):
            filename += '.json'
        
        filepath = os.path.join(self.save_dir, filename)
        
        try:
            if os.path.exists(filepath):
                os.remove(filepath)
                return True
            return False
        except Exception as e:
            print(f"Erro ao deletar personagem {filename}: {e}")
            return False
    
    def get_character_info(self, filename: str) -> Optional[Dict[str, str]]:
        """
        Obtém informações básicas de um personagem sem carregá-lo completamente
        
        Args:
            filename: Nome do arquivo
            
        Returns:
            Dicionário com informações do personagem ou None se não encontrado
        """
        if not filename.endswith('.json'):
            filename += '.json'
        
        filepath = os.path.join(self.save_dir, filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            return {
                'filename': filename,
                'name': data.get('name', 'Unknown'),
                'level': data.get('level', 1),
                'race': data.get('race', {}).get('name', 'Unknown') if data.get('race') else 'Unknown',
                'class': data.get('character_class', {}).get('name', 'Unknown') if data.get('character_class') else 'Unknown',
                'created_at': data.get('created_at', ''),
                'updated_at': data.get('updated_at', '')
            }
        except Exception as e:
            print(f"Erro ao obter informações do personagem {filename}: {e}")
            return None