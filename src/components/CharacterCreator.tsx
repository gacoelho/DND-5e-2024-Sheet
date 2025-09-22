import React, { useState, useEffect } from 'react';
import { Character, Race, CharacterClass, Background, AbilityScores, AbilityScoreMethod } from '../types/Character';
import DataManager from '../utils/dataManager';
import { 
  createCharacter, 
  generateStandardArray, 
  generatePointBuy, 
  generateRolledScores,
  saveCharacter 
} from '../utils/characterUtils';
import { Save, Dice1, Calculator, Shuffle } from 'lucide-react';

interface CharacterCreatorProps {
  onCharacterCreated: (character: Character) => void;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreated }) => {
  const [dataManager] = useState(new DataManager());
  const [races, setRaces] = useState<Race[]>([]);
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Character data
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);
  const [abilityScores, setAbilityScores] = useState<AbilityScores>(generateStandardArray());
  const [abilityScoreMethod, setAbilityScoreMethod] = useState<AbilityScoreMethod>('standard_array');

  useEffect(() => {
    const races = dataManager.getRaces();
    const classes = dataManager.getClasses();
    const backgrounds = dataManager.getBackgrounds();
    
    setRaces(races);
    setClasses(classes);
    setBackgrounds(backgrounds);
  }, [dataManager]);

  const handleAbilityScoreMethodChange = (method: AbilityScoreMethod) => {
    setAbilityScoreMethod(method);
    
    switch (method) {
      case 'standard_array':
        setAbilityScores(generateStandardArray());
        break;
      case 'point_buy':
        setAbilityScores(generatePointBuy());
        break;
      case 'roll_dice':
        setAbilityScores(generateRolledScores());
        break;
    }
  };

  const handleCreateCharacter = () => {
    if (!name || !selectedRace || !selectedClass || !selectedBackground) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const character = createCharacter(
      name,
      level,
      selectedRace,
      selectedClass,
      selectedBackground,
      abilityScores
    );

    saveCharacter(character);
    onCharacterCreated(character);
    
    // Reset form
    setName('');
    setLevel(1);
    setSelectedRace(null);
    setSelectedClass(null);
    setSelectedBackground(null);
    setAbilityScores(generateStandardArray());
    setCurrentStep(1);
    
    alert('Personagem criado com sucesso!');
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Informações Básicas</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nome do Personagem *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          placeholder="Digite o nome do personagem"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nível *
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Raça *
        </label>
        <select
          value={selectedRace?.id || ''}
          onChange={(e) => {
            const race = races.find(r => r.id === e.target.value);
            setSelectedRace(race || null);
          }}
          className="select-field"
        >
          <option value="">Selecione uma raça</option>
          {races.map(race => (
            <option key={race.id} value={race.id}>
              {race.name_pt} ({race.name})
            </option>
          ))}
        </select>
        {selectedRace && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedRace.description_pt}
            </p>
            <div className="mt-2">
              <strong className="text-sm">Bônus de Habilidade:</strong>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {Object.entries(selectedRace.ability_score_increases).map(([ability, bonus]) => (
                  <span key={ability} className="mr-2">
                    {ability}: +{bonus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Classe *
        </label>
        <select
          value={selectedClass?.id || ''}
          onChange={(e) => {
            const cls = classes.find(c => c.id === e.target.value);
            setSelectedClass(cls || null);
          }}
          className="select-field"
        >
          <option value="">Selecione uma classe</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name_pt} ({cls.name})
            </option>
          ))}
        </select>
        {selectedClass && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedClass.description_pt}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <strong>Dado de Vida:</strong> d{selectedClass.hit_die}
              </div>
              <div>
                <strong>Magia:</strong> {selectedClass.spellcasting ? 'Sim' : 'Não'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Antecedente *
        </label>
        <select
          value={selectedBackground?.id || ''}
          onChange={(e) => {
            const bg = backgrounds.find(b => b.id === e.target.value);
            setSelectedBackground(bg || null);
          }}
          className="select-field"
        >
          <option value="">Selecione um antecedente</option>
          {backgrounds.map(bg => (
            <option key={bg.id} value={bg.id}>
              {bg.name_pt} ({bg.name})
            </option>
          ))}
        </select>
        {selectedBackground && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedBackground.description_pt}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAbilityScores = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Habilidades</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Método de Pontuação
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleAbilityScoreMethodChange('standard_array')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              abilityScoreMethod === 'standard_array'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <Calculator className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Array Padrão</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">15, 14, 13, 12, 10, 8</div>
          </button>
          
          <button
            onClick={() => handleAbilityScoreMethodChange('point_buy')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              abilityScoreMethod === 'point_buy'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <Calculator className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Compra por Pontos</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">27 pontos total</div>
          </button>
          
          <button
            onClick={() => handleAbilityScoreMethodChange('roll_dice')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              abilityScoreMethod === 'roll_dice'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <Dice1 className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Rolagem de Dados</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">4d6, descarte o menor</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(abilityScores).map(([ability, score]) => (
          <div key={ability} className="ability-score">
            <div className="ability-label">{ability}</div>
            <div className="ability-value">{score}</div>
            <div className="ability-modifier">
              {Math.floor((score - 10) / 2) >= 0 ? '+' : ''}{Math.floor((score - 10) / 2)}
            </div>
            {abilityScoreMethod !== 'roll_dice' && (
              <input
                type="number"
                min="8"
                max="15"
                value={score}
                onChange={(e) => {
                  const newScore = parseInt(e.target.value) || 8;
                  setAbilityScores(prev => ({
                    ...prev,
                    [ability]: newScore
                  }));
                }}
                className="mt-2 w-full px-2 py-1 text-center border rounded"
              />
            )}
          </div>
        ))}
      </div>

      {abilityScoreMethod === 'roll_dice' && (
        <div className="text-center">
          <button
            onClick={() => setAbilityScores(generateRolledScores())}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <Shuffle size={20} />
            <span>Rolar Novamente</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="main-header mb-8">⚔️ Criador de Personagem D&D 5e</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {step}
              </div>
              {step < 2 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentStep === 1 ? 'Informações Básicas' : 'Habilidades'}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card mb-8">
        {currentStep === 1 && renderBasicInfo()}
        {currentStep === 2 && renderAbilityScores()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        
        {currentStep < 2 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="btn-primary"
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={handleCreateCharacter}
            className="btn-success flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Criar Personagem</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterCreator;