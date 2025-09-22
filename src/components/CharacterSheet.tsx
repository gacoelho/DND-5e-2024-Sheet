import React, { useState, useEffect } from 'react';
import { Character } from '../types/Character';
import { getSavedCharacters, loadCharacter } from '../utils/characterUtils';
import { FileText, Download, Trash2, Plus } from 'lucide-react';

interface CharacterSheetProps {
  character: Character | null;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');

  useEffect(() => {
    const characters = getSavedCharacters();
    setSavedCharacters(characters);
    
    if (character) {
      setSelectedCharacterId(character.id);
    }
  }, [character]);

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacterId(characterId);
    const selectedCharacter = loadCharacter(characterId);
    if (selectedCharacter) {
      // You could emit an event or use a callback here to update the parent
    }
  };

  const handleDeleteCharacter = (characterId: string) => {
    if (confirm('Tem certeza que deseja deletar este personagem?')) {
      // Delete logic would go here
      const updatedCharacters = savedCharacters.filter(c => c.id !== characterId);
      setSavedCharacters(updatedCharacters);
      if (selectedCharacterId === characterId) {
        setSelectedCharacterId('');
      }
    }
  };

  const handleExportPDF = () => {
    // PDF export logic would go here
    alert('Funcionalidade de exportação PDF será implementada em breve!');
  };

  const selectedCharacter = selectedCharacterId ? 
    savedCharacters.find(c => c.id === selectedCharacterId) : 
    character;

  if (!selectedCharacter) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="main-header mb-8">📋 Ficha de Personagem</h1>
        
        {savedCharacters.length > 0 ? (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Personagens Salvos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCharacters.map(char => (
                <div key={char.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <h3 className="font-semibold text-lg">{char.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {char.race.name_pt} {char.class.name_pt} Nível {char.level}
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleCharacterSelect(char.id)}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Selecionar
                    </button>
                    <button
                      onClick={() => handleDeleteCharacter(char.id)}
                      className="btn-danger text-sm px-3 py-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <FileText size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nenhum personagem encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Crie seu primeiro personagem para começar!
            </p>
            <a
              href="/create"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Criar Personagem</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="main-header mb-0">📋 {selectedCharacter.name}</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleExportPDF}
            className="btn-primary flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Nome:</span> {selectedCharacter.name}
              </div>
              <div>
                <span className="font-medium">Nível:</span> {selectedCharacter.level}
              </div>
              <div>
                <span className="font-medium">Raça:</span> {selectedCharacter.race.name_pt}
              </div>
              <div>
                <span className="font-medium">Classe:</span> {selectedCharacter.class.name_pt}
              </div>
              <div>
                <span className="font-medium">Antecedente:</span> {selectedCharacter.background.name_pt}
              </div>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Estatísticas de Combate</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Pontos de Vida:</span>
                <span className="font-semibold">{selectedCharacter.hit_points}/{selectedCharacter.max_hit_points}</span>
              </div>
              <div className="flex justify-between">
                <span>Classe de Armadura:</span>
                <span className="font-semibold">{selectedCharacter.armor_class}</span>
              </div>
              <div className="flex justify-between">
                <span>Iniciativa:</span>
                <span className="font-semibold">
                  {selectedCharacter.initiative >= 0 ? '+' : ''}{selectedCharacter.initiative}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Velocidade:</span>
                <span className="font-semibold">{selectedCharacter.speed} pés</span>
              </div>
              <div className="flex justify-between">
                <span>Bônus de Proficiência:</span>
                <span className="font-semibold">
                  +{selectedCharacter.proficiency_bonus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ability Scores */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Habilidades</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(selectedCharacter.ability_scores).map(([ability, score]) => (
                <div key={ability} className="ability-score">
                  <div className="ability-label">{ability}</div>
                  <div className="ability-value">{score}</div>
                  <div className="ability-modifier">
                    {selectedCharacter.ability_modifiers[ability as keyof typeof selectedCharacter.ability_modifiers] >= 0 ? '+' : ''}
                    {selectedCharacter.ability_modifiers[ability as keyof typeof selectedCharacter.ability_modifiers]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Perícias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History',
                'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception',
                'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'
              ].map(skill => (
                <div key={skill} className="flex justify-between items-center py-1">
                  <span className="text-sm">{skill}</span>
                  <span className="text-sm font-mono">
                    {selectedCharacter.ability_modifiers[skill.toLowerCase().replace(' ', '_') as keyof typeof selectedCharacter.ability_modifiers] || 0 >= 0 ? '+' : ''}
                    {selectedCharacter.ability_modifiers[skill.toLowerCase().replace(' ', '_') as keyof typeof selectedCharacter.ability_modifiers] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Características</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Traços Raciais</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  {selectedCharacter.race.traits_pt.map((trait, index) => (
                    <li key={index}>• {trait}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Características de Classe</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  {selectedCharacter.class.features_pt.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Características de Antecedente</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  {selectedCharacter.background.features_pt.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;