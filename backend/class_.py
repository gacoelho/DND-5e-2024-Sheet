"""
Classe para representar classes de personagem
"""

from typing import Dict, Any, List, Optional
from .ability import Ability
from .item import Item


class CharacterClass:
    """
    Classe para representar classes de personagem em D&D 5e
    """
    
    def __init__(self, name: str, hit_die: int = 8, 
                 primary_ability: str = "str",
                 saving_throw_proficiencies: List[str] = None,
                 skill_proficiencies: List[str] = None,
                 equipment: List[Item] = None,
                 features: List[Ability] = None,
                 spellcasting: bool = False,
                 spellcasting_ability: str = None,
                 subclasses: List[str] = None):
        """
        Inicializa uma classe de personagem
        
        Args:
            name: Nome da classe
            hit_die: Dado de vida (6, 8, 10, 12)
            primary_ability: Habilidade primária da classe
            saving_throw_proficiencies: Proficiências em salvamentos
            skill_proficiencies: Proficiências em perícias
            equipment: Equipamentos iniciais
            features: Características especiais
            spellcasting: Se a classe tem magia
            spellcasting_ability: Habilidade usada para magia
            subclasses: Lista de subclasses disponíveis
        """
        self.name = name
        self.hit_die = hit_die
        self.primary_ability = primary_ability
        self.saving_throw_proficiencies = saving_throw_proficiencies or []
        self.skill_proficiencies = skill_proficiencies or []
        self.equipment = equipment or []
        self.features = features or []
        self.spellcasting = spellcasting
        self.spellcasting_ability = spellcasting_ability
        self.subclasses = subclasses or []
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte a classe para dicionário"""
        return {
            'name': self.name,
            'hit_die': self.hit_die,
            'primary_ability': self.primary_ability,
            'saving_throw_proficiencies': self.saving_throw_proficiencies,
            'skill_proficiencies': self.skill_proficiencies,
            'equipment': [item.to_dict() for item in self.equipment],
            'features': [feature.to_dict() for feature in self.features],
            'spellcasting': self.spellcasting,
            'spellcasting_ability': self.spellcasting_ability,
            'subclasses': self.subclasses
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'CharacterClass':
        """Cria uma classe a partir de dicionário"""
        return cls(
            name=data['name'],
            hit_die=data.get('hit_die', 8),
            primary_ability=data.get('primary_ability', 'str'),
            saving_throw_proficiencies=data.get('saving_throw_proficiencies', []),
            skill_proficiencies=data.get('skill_proficiencies', []),
            equipment=[Item.from_dict(item) for item in data.get('equipment', [])],
            features=[Ability.from_dict(feature) for feature in data.get('features', [])],
            spellcasting=data.get('spellcasting', False),
            spellcasting_ability=data.get('spellcasting_ability'),
            subclasses=data.get('subclasses', [])
        )
    
    def __str__(self) -> str:
        return self.name
    
    def __repr__(self) -> str:
        return f"CharacterClass(name='{self.name}', hit_die={self.hit_die})"