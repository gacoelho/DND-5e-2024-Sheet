"""
Classe para representar itens de personagem
"""

from typing import Dict, Any, Optional, List


class Item:
    """
    Classe para representar itens de personagem em D&D 5e
    """
    
    def __init__(self, name: str, item_type: str = "general", 
                 description: str = "", weight: float = 0.0, 
                 value: str = "", properties: List[str] = None):
        """
        Inicializa um item
        
        Args:
            name: Nome do item
            item_type: Tipo do item (weapon, armor, tool, general, etc.)
            description: Descrição do item
            weight: Peso do item em libras
            value: Valor monetário do item
            properties: Lista de propriedades especiais do item
        """
        self.name = name
        self.item_type = item_type
        self.description = description
        self.weight = weight
        self.value = value
        self.properties = properties or []
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte o item para dicionário"""
        return {
            'name': self.name,
            'item_type': self.item_type,
            'description': self.description,
            'weight': self.weight,
            'value': self.value,
            'properties': self.properties
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Item':
        """Cria um item a partir de dicionário"""
        return cls(
            name=data['name'],
            item_type=data.get('item_type', 'general'),
            description=data.get('description', ''),
            weight=data.get('weight', 0.0),
            value=data.get('value', ''),
            properties=data.get('properties', [])
        )
    
    def __str__(self) -> str:
        return f"{self.name} ({self.item_type})"
    
    def __repr__(self) -> str:
        return f"Item(name='{self.name}', type='{self.item_type}')"