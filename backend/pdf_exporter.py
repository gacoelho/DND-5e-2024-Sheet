"""
Sistema de exportação de fichas de personagem para PDF
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from typing import List, Dict, Any
from .character import Character


class PDFExporter:
    """
    Classe para exportar fichas de personagem para PDF
    """
    
    def __init__(self):
        """Inicializa o exportador PDF"""
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Configura estilos personalizados para o PDF"""
        # Estilo para título principal
        self.styles.add(ParagraphStyle(
            name='CharacterTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.darkblue
        ))
        
        # Estilo para subtítulos
        self.styles.add(ParagraphStyle(
            name='SectionTitle',
            parent=self.styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            spaceBefore=12,
            textColor=colors.darkblue
        ))
        
        # Estilo para informações básicas
        self.styles.add(ParagraphStyle(
            name='BasicInfo',
            parent=self.styles['Normal'],
            fontSize=12,
            spaceAfter=6
        ))
        
        # Estilo para habilidades
        self.styles.add(ParagraphStyle(
            name='Ability',
            parent=self.styles['Normal'],
            fontSize=10,
            spaceAfter=3,
            leftIndent=20
        ))
    
    def export_character(self, character: Character, filename: str) -> str:
        """
        Exporta um personagem para PDF
        
        Args:
            character: Personagem a ser exportado
            filename: Nome do arquivo de saída
            
        Returns:
            Caminho do arquivo gerado
        """
        doc = SimpleDocTemplate(filename, pagesize=A4)
        story = []
        
        # Título principal
        title = f"{character.name} - Level {character.level}"
        if character.race:
            title += f" {character.race.name}"
        if character.character_class:
            title += f" {character.character_class.name}"
        
        story.append(Paragraph(title, self.styles['CharacterTitle']))
        story.append(Spacer(1, 20))
        
        # Informações básicas
        story.append(Paragraph("Informações Básicas", self.styles['SectionTitle']))
        
        basic_info = [
            ["Nome:", character.name],
            ["Nível:", str(character.level)],
            ["Raça:", character.race.name if character.race else "Não definida"],
            ["Classe:", character.character_class.name if character.character_class else "Não definida"],
            ["Antecedente:", character.background.name if character.background else "Não definido"],
            ["Pontos de Vida:", str(character.hit_points)],
            ["Classe de Armadura:", str(character.armor_class)],
            ["Velocidade:", f"{character.speed} pés"]
        ]
        
        basic_table = Table(basic_info, colWidths=[2*inch, 3*inch])
        basic_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        
        story.append(basic_table)
        story.append(Spacer(1, 20))
        
        # Habilidades
        story.append(Paragraph("Habilidades", self.styles['SectionTitle']))
        
        ability_scores = character.ability_scores
        ability_modifiers = character.get_ability_modifiers()
        
        ability_data = []
        for ability in ['str', 'dex', 'con', 'int', 'wis', 'cha']:
            ability_name = {
                'str': 'Força', 'dex': 'Destreza', 'con': 'Constituição',
                'int': 'Inteligência', 'wis': 'Sabedoria', 'cha': 'Carisma'
            }[ability]
            
            score = ability_scores.get(ability, 10)
            modifier = ability_modifiers.get(ability, 0)
            modifier_str = f"+{modifier}" if modifier >= 0 else str(modifier)
            
            ability_data.append([ability_name, str(score), modifier_str])
        
        ability_table = Table(ability_data, colWidths=[1.5*inch, 1*inch, 1*inch])
        ability_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
        ]))
        
        # Cabeçalho da tabela
        header = Table([['Habilidade', 'Valor', 'Modificador']], colWidths=[1.5*inch, 1*inch, 1*inch])
        header.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BACKGROUND', (0, 0), (-1, -1), colors.darkblue),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),
        ]))
        
        story.append(header)
        story.append(ability_table)
        story.append(Spacer(1, 20))
        
        # Equipamentos
        if character.equipment:
            story.append(Paragraph("Equipamentos", self.styles['SectionTitle']))
            
            equipment_data = []
            for item in character.equipment:
                equipment_data.append([
                    item.name,
                    item.item_type,
                    f"{item.weight} lb" if item.weight > 0 else "-",
                    item.value if item.value else "-"
                ])
            
            equipment_table = Table(equipment_data, colWidths=[2*inch, 1.5*inch, 1*inch, 1*inch])
            equipment_table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ]))
            
            # Cabeçalho da tabela de equipamentos
            equipment_header = Table([['Nome', 'Tipo', 'Peso', 'Valor']], colWidths=[2*inch, 1.5*inch, 1*inch, 1*inch])
            equipment_header.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BACKGROUND', (0, 0), (-1, -1), colors.darkblue),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),
            ]))
            
            story.append(equipment_header)
            story.append(equipment_table)
            story.append(Spacer(1, 20))
        
        # Habilidades especiais
        if character.abilities:
            story.append(Paragraph("Habilidades Especiais", self.styles['SectionTitle']))
            
            for ability in character.abilities:
                story.append(Paragraph(f"<b>{ability.name}</b>", self.styles['Ability']))
                if ability.description:
                    story.append(Paragraph(ability.description, self.styles['Ability']))
                story.append(Spacer(1, 6))
        
        # Notas
        if character.notes:
            story.append(Paragraph("Notas", self.styles['SectionTitle']))
            story.append(Paragraph(character.notes, self.styles['BasicInfo']))
        
        # Gera o PDF
        doc.build(story)
        return filename