"""
Classe para representar antecedentes de personagem
"""

from typing import Dict, Any, List, Optional
from .ability import Ability
from .item import Item


class Background:
    """
    Classe para representar antecedentes de personagem em D&D 5e
    """
    
    def __init__(self, name: str, description: str = "", 
                 skill_proficiencies: List[str] = None,
                 tool_proficiencies: List[str] = None,
                 languages: List[str] = None,
                 equipment: List[Item] = None,
                 features: List[Ability] = None,
                 personality_traits: List[str] = None,
                 ideals: List[str] = None,
                 bonds: List[str] = None,
                 flaws: List[str] = None):
        """
        Inicializa um antecedente
        
        Args:
            name: Nome do antecedente
            description: Descrição do antecedente
            skill_proficiencies: Lista de proficiências em perícias
            tool_proficiencies: Lista de proficiências em ferramentas
            languages: Lista de idiomas conhecidos
            equipment: Lista de equipamentos iniciais
            features: Lista de características especiais
            personality_traits: Lista de traços de personalidade
            ideals: Lista de ideais
            bonds: Lista de vínculos
            flaws: Lista de defeitos
        """
        self.name = name
        self.description = description
        self.skill_proficiencies = skill_proficiencies or []
        self.tool_proficiencies = tool_proficiencies or []
        self.languages = languages or []
        self.equipment = equipment or []
        self.features = features or []
        self.personality_traits = personality_traits or []
        self.ideals = ideals or []
        self.bonds = bonds or []
        self.flaws = flaws or []
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte o antecedente para dicionário"""
        return {
            'name': self.name,
            'description': self.description,
            'skill_proficiencies': self.skill_proficiencies,
            'tool_proficiencies': self.tool_proficiencies,
            'languages': self.languages,
            'equipment': [item.to_dict() for item in self.equipment],
            'features': [feature.to_dict() for feature in self.features],
            'personality_traits': self.personality_traits,
            'ideals': self.ideals,
            'bonds': self.bonds,
            'flaws': self.flaws
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Background':
        """Cria um antecedente a partir de dicionário"""
        return cls(
            name=data['name'],
            description=data.get('description', ''),
            skill_proficiencies=data.get('skill_proficiencies', []),
            tool_proficiencies=data.get('tool_proficiencies', []),
            languages=data.get('languages', []),
            equipment=[Item.from_dict(item) for item in data.get('equipment', [])],
            features=[Ability.from_dict(feature) for feature in data.get('features', [])],
            personality_traits=data.get('personality_traits', []),
            ideals=data.get('ideals', []),
            bonds=data.get('bonds', []),
            flaws=data.get('flaws', [])
        )
    
    def __str__(self) -> str:
        return self.name
    
    def __repr__(self) -> str:
        return f"Background(name='{self.name}')"