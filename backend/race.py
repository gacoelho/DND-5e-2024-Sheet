"""
Classe para representar raças de personagem
"""

from typing import Dict, Any, List, Optional
from .ability import Ability


class Race:
    """
    Classe para representar raças de personagem em D&D 5e
    """
    
    def __init__(self, name: str, description: str = "",
                 ability_score_increases: Dict[str, int] = None,
                 size: str = "Medium",
                 speed: int = 30,
                 languages: List[str] = None,
                 features: List[Ability] = None,
                 subraces: List[str] = None):
        """
        Inicializa uma raça
        
        Args:
            name: Nome da raça
            description: Descrição da raça
            ability_score_increases: Aumentos de habilidade (ex: {"str": 2, "con": 1})
            size: Tamanho da criatura (Tiny, Small, Medium, Large, Huge, Gargantuan)
            speed: Velocidade de movimento em pés
            languages: Idiomas conhecidos
            features: Características especiais
            subraces: Lista de subraças disponíveis
        """
        self.name = name
        self.description = description
        self.ability_score_increases = ability_score_increases or {}
        self.size = size
        self.speed = speed
        self.languages = languages or []
        self.features = features or []
        self.subraces = subraces or []
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte a raça para dicionário"""
        return {
            'name': self.name,
            'description': self.description,
            'ability_score_increases': self.ability_score_increases,
            'size': self.size,
            'speed': self.speed,
            'languages': self.languages,
            'features': [feature.to_dict() for feature in self.features],
            'subraces': self.subraces
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Race':
        """Cria uma raça a partir de dicionário"""
        return cls(
            name=data['name'],
            description=data.get('description', ''),
            ability_score_increases=data.get('ability_score_increases', {}),
            size=data.get('size', 'Medium'),
            speed=data.get('speed', 30),
            languages=data.get('languages', []),
            features=[Ability.from_dict(feature) for feature in data.get('features', [])],
            subraces=data.get('subraces', [])
        )
    
    def __str__(self) -> str:
        return self.name
    
    def __repr__(self) -> str:
        return f"Race(name='{self.name}', size='{self.size}')"