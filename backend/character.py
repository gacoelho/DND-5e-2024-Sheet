"""
Classe principal para representar personagens
"""

from typing import Dict, Any, List, Optional
import json
from datetime import datetime
from .race import Race
from .class_ import CharacterClass
from .background import Background
from .item import Item
from .ability import Ability


class Character:
    """
    Classe principal para representar personagens de D&D 5e
    """
    
    def __init__(self, name: str = "", level: int = 1, 
                 race: Optional[Race] = None,
                 character_class: Optional[CharacterClass] = None,
                 background: Optional[Background] = None,
                 ability_scores: Dict[str, int] = None,
                 hit_points: int = 0,
                 armor_class: int = 10,
                 speed: int = 30,
                 equipment: List[Item] = None,
                 abilities: List[Ability] = None,
                 notes: str = ""):
        """
        Inicializa um personagem
        
        Args:
            name: Nome do personagem
            level: Nível do personagem
            race: Raça do personagem
            character_class: Classe do personagem
            background: Antecedente do personagem
            ability_scores: Pontuações de habilidade
            hit_points: Pontos de vida
            armor_class: Classe de armadura
            speed: Velocidade de movimento
            equipment: Lista de equipamentos
            abilities: Lista de habilidades
            notes: Notas adicionais
        """
        self.name = name
        self.level = level
        self.race = race
        self.character_class = character_class
        self.background = background
        self.ability_scores = ability_scores or {
            'str': 10, 'dex': 10, 'con': 10, 
            'int': 10, 'wis': 10, 'cha': 10
        }
        self.hit_points = hit_points
        self.armor_class = armor_class
        self.speed = speed
        self.equipment = equipment or []
        self.abilities = abilities or []
        self.notes = notes
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()
    
    def calculate_ability_modifier(self, ability: str) -> int:
        """Calcula o modificador de habilidade"""
        score = self.ability_scores.get(ability, 10)
        return (score - 10) // 2
    
    def get_ability_modifiers(self) -> Dict[str, int]:
        """Retorna todos os modificadores de habilidade"""
        return {ability: self.calculate_ability_modifier(ability) 
                for ability in self.ability_scores}
    
    def apply_race_bonuses(self):
        """Aplica os bônus da raça às habilidades"""
        if self.race and self.race.ability_score_increases:
            for ability, bonus in self.race.ability_score_increases.items():
                self.ability_scores[ability] += bonus
    
    def calculate_hit_points(self) -> int:
        """Calcula os pontos de vida baseados na classe e nível"""
        if not self.character_class:
            return 0
        
        base_hp = self.character_class.hit_die + self.calculate_ability_modifier('con')
        additional_hp = (self.character_class.hit_die // 2 + 1 + 
                        self.calculate_ability_modifier('con')) * (self.level - 1)
        return base_hp + additional_hp
    
    def calculate_armor_class(self) -> int:
        """Calcula a classe de armadura"""
        base_ac = 10 + self.calculate_ability_modifier('dex')
        # Aqui você pode adicionar lógica para armaduras, escudos, etc.
        return base_ac
    
    def get_proficiency_bonus(self) -> int:
        """Calcula o bônus de proficiência baseado no nível"""
        return 2 + (self.level - 1) // 4
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte o personagem para dicionário"""
        return {
            'name': self.name,
            'level': self.level,
            'race': self.race.to_dict() if self.race else None,
            'character_class': self.character_class.to_dict() if self.character_class else None,
            'background': self.background.to_dict() if self.background else None,
            'ability_scores': self.ability_scores,
            'hit_points': self.hit_points,
            'armor_class': self.armor_class,
            'speed': self.speed,
            'equipment': [item.to_dict() for item in self.equipment],
            'abilities': [ability.to_dict() for ability in self.abilities],
            'notes': self.notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Character':
        """Cria um personagem a partir de dicionário"""
        character = cls(
            name=data.get('name', ''),
            level=data.get('level', 1),
            ability_scores=data.get('ability_scores', {
                'str': 10, 'dex': 10, 'con': 10, 
                'int': 10, 'wis': 10, 'cha': 10
            }),
            hit_points=data.get('hit_points', 0),
            armor_class=data.get('armor_class', 10),
            speed=data.get('speed', 30),
            equipment=[Item.from_dict(item) for item in data.get('equipment', [])],
            abilities=[Ability.from_dict(ability) for ability in data.get('abilities', [])],
            notes=data.get('notes', '')
        )
        
        if data.get('race'):
            character.race = Race.from_dict(data['race'])
        if data.get('character_class'):
            character.character_class = CharacterClass.from_dict(data['character_class'])
        if data.get('background'):
            character.background = Background.from_dict(data['background'])
        
        character.created_at = data.get('created_at', datetime.now().isoformat())
        character.updated_at = data.get('updated_at', datetime.now().isoformat())
        
        return character
    
    def save_to_file(self, filename: str):
        """Salva o personagem em arquivo JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)
    
    @classmethod
    def load_from_file(cls, filename: str) -> 'Character':
        """Carrega um personagem de arquivo JSON"""
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls.from_dict(data)
    
    def __str__(self) -> str:
        return f"{self.name} - Level {self.level} {self.race} {self.character_class}"
    
    def __repr__(self) -> str:
        return f"Character(name='{self.name}', level={self.level})"