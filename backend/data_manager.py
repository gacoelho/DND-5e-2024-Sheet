"""
Gerenciador de dados para o sistema D&D 5e
"""

import json
import os
from typing import Dict, List, Any, Optional
from .race import Race
from .class_ import CharacterClass
from .background import Background


class DataManager:
    """
    Classe para gerenciar dados de raças, classes e antecedentes
    """
    
    def __init__(self, data_dir: str = "backend/data"):
        """
        Inicializa o gerenciador de dados
        
        Args:
            data_dir: Diretório onde estão os arquivos de dados
        """
        self.data_dir = data_dir
        self._races = None
        self._classes = None
        self._backgrounds = None
    
    def load_races(self) -> List[Race]:
        """Carrega todas as raças do arquivo JSON"""
        if self._races is None:
            with open(os.path.join(self.data_dir, "races.json"), 'r', encoding='utf-8') as f:
                data = json.load(f)
            self._races = [Race.from_dict(race_data) for race_data in data['races']]
        return self._races
    
    def load_classes(self) -> List[CharacterClass]:
        """Carrega todas as classes do arquivo JSON"""
        if self._classes is None:
            with open(os.path.join(self.data_dir, "classes.json"), 'r', encoding='utf-8') as f:
                data = json.load(f)
            self._classes = [CharacterClass.from_dict(class_data) for class_data in data['classes']]
        return self._classes
    
    def load_backgrounds(self) -> List[Background]:
        """Carrega todos os antecedentes do arquivo JSON"""
        if self._backgrounds is None:
            with open(os.path.join(self.data_dir, "backgrounds.json"), 'r', encoding='utf-8') as f:
                data = json.load(f)
            self._backgrounds = [Background.from_dict(bg_data) for bg_data in data['backgrounds']]
        return self._backgrounds
    
    def get_race_by_name(self, name: str) -> Optional[Race]:
        """Busca uma raça pelo nome"""
        races = self.load_races()
        for race in races:
            if race.name.lower() == name.lower():
                return race
        return None
    
    def get_class_by_name(self, name: str) -> Optional[CharacterClass]:
        """Busca uma classe pelo nome"""
        classes = self.load_classes()
        for cls in classes:
            if cls.name.lower() == name.lower():
                return cls
        return None
    
    def get_background_by_name(self, name: str) -> Optional[Background]:
        """Busca um antecedente pelo nome"""
        backgrounds = self.load_backgrounds()
        for bg in backgrounds:
            if bg.name.lower() == name.lower():
                return bg
        return None
    
    def get_race_names(self) -> List[str]:
        """Retorna lista de nomes de raças"""
        return [race.name for race in self.load_races()]
    
    def get_class_names(self) -> List[str]:
        """Retorna lista de nomes de classes"""
        return [cls.name for cls in self.load_classes()]
    
    def get_background_names(self) -> List[str]:
        """Retorna lista de nomes de antecedentes"""
        return [bg.name for bg in self.load_backgrounds()]