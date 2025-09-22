"""
Classe para representar habilidades de personagem
"""

from typing import Dict, Any, Optional


class Ability:
    """
    Classe para representar habilidades de personagem em D&D 5e
    """
    
    def __init__(self, name: str, description: str = "", ability_type: str = "general"):
        """
        Inicializa uma habilidade
        
        Args:
            name: Nome da habilidade
            description: Descrição da habilidade
            ability_type: Tipo da habilidade (general, racial, class, background)
        """
        self.name = name
        self.description = description
        self.ability_type = ability_type
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte a habilidade para dicionário"""
        return {
            'name': self.name,
            'description': self.description,
            'ability_type': self.ability_type
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Ability':
        """Cria uma habilidade a partir de dicionário"""
        return cls(
            name=data['name'],
            description=data.get('description', ''),
            ability_type=data.get('ability_type', 'general')
        )
    
    def __str__(self) -> str:
        return f"{self.name}: {self.description}"
    
    def __repr__(self) -> str:
        return f"Ability(name='{self.name}', type='{self.ability_type}')"