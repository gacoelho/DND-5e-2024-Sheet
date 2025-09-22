import { AbilityScores, AbilityModifiers, Character, Race, CharacterClass, Background } from '../types/Character';

export const calculateAbilityModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateAbilityModifiers = (scores: AbilityScores): AbilityModifiers => {
  return {
    strength: calculateAbilityModifier(scores.strength),
    dexterity: calculateAbilityModifier(scores.dexterity),
    constitution: calculateAbilityModifier(scores.constitution),
    intelligence: calculateAbilityModifier(scores.intelligence),
    wisdom: calculateAbilityModifier(scores.wisdom),
    charisma: calculateAbilityModifier(scores.charisma)
  };
};

export const calculateProficiencyBonus = (level: number): number => {
  return Math.ceil(level / 4) + 1;
};

export const calculateArmorClass = (character: Character): number => {
  const dexMod = character.ability_modifiers.dexterity;
  const baseAC = 10 + dexMod;
  
  // Add armor bonuses here if needed
  return baseAC;
};

export const calculateHitPoints = (character: Character): number => {
  const conMod = character.ability_modifiers.constitution;
  const hitDie = character.class.hit_die;
  const level = character.level;
  
  // First level gets max hit points
  let totalHP = hitDie + conMod;
  
  // Additional levels get average + con mod
  for (let i = 2; i <= level; i++) {
    totalHP += Math.floor(hitDie / 2) + 1 + conMod;
  }
  
  return totalHP;
};

export const calculateInitiative = (character: Character): number => {
  return character.ability_modifiers.dexterity;
};

export const calculateSpeed = (character: Character): number => {
  return character.race.speed;
};

export const applyRaceBonuses = (scores: AbilityScores, race: Race): AbilityScores => {
  const bonuses = race.ability_score_increases;
  return {
    strength: scores.strength + (bonuses.strength || 0),
    dexterity: scores.dexterity + (bonuses.dexterity || 0),
    constitution: scores.constitution + (bonuses.constitution || 0),
    intelligence: scores.intelligence + (bonuses.intelligence || 0),
    wisdom: scores.wisdom + (bonuses.wisdom || 0),
    charisma: scores.charisma + (bonuses.charisma || 0)
  };
};

export const generateStandardArray = (): AbilityScores => {
  return {
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intelligence: 12,
    wisdom: 10,
    charisma: 8
  };
};

export const generatePointBuy = (): AbilityScores => {
  // Point buy system - 27 points total
  // 8 = 0 points, 9 = 1 point, 10 = 2 points, etc.
  // Max 15 before racial bonuses
  return {
    strength: 15,
    dexterity: 15,
    constitution: 15,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
  };
};

export const rollDice = (sides: number): number => {
  return Math.floor(Math.random() * sides) + 1;
};

export const roll4d6DropLowest = (): number => {
  const rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
  rolls.sort((a, b) => b - a); // Sort descending
  return rolls[0] + rolls[1] + rolls[2]; // Sum top 3
};

export const generateRolledScores = (): AbilityScores => {
  const scores = [
    roll4d6DropLowest(),
    roll4d6DropLowest(),
    roll4d6DropLowest(),
    roll4d6DropLowest(),
    roll4d6DropLowest(),
    roll4d6DropLowest()
  ];
  
  scores.sort((a, b) => b - a); // Sort descending
  
  return {
    strength: scores[0],
    dexterity: scores[1],
    constitution: scores[2],
    intelligence: scores[3],
    wisdom: scores[4],
    charisma: scores[5]
  };
};

export const createCharacter = (
  name: string,
  level: number,
  race: Race,
  characterClass: CharacterClass,
  background: Background,
  abilityScores: AbilityScores
): Character => {
  const finalScores = applyRaceBonuses(abilityScores, race);
  const abilityModifiers = calculateAbilityModifiers(finalScores);
  const proficiencyBonus = calculateProficiencyBonus(level);
  
  const character: Character = {
    id: `char_${Date.now()}`,
    name,
    level,
    race,
    class: characterClass,
    background,
    ability_scores: finalScores,
    ability_modifiers: abilityModifiers,
    hit_points: 0, // Will be calculated
    max_hit_points: 0, // Will be calculated
    armor_class: 0, // Will be calculated
    initiative: 0, // Will be calculated
    speed: race.speed,
    proficiency_bonus: proficiencyBonus,
    saving_throws: characterClass.saving_throw_proficiencies,
    skills: {},
    equipment: [],
    abilities: [],
    spells: [],
    notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Calculate derived stats
  character.max_hit_points = calculateHitPoints(character);
  character.hit_points = character.max_hit_points;
  character.armor_class = calculateArmorClass(character);
  character.initiative = calculateInitiative(character);
  
  return character;
};

export const saveCharacter = (character: Character): void => {
  const savedCharacters = getSavedCharacters();
  const existingIndex = savedCharacters.findIndex(c => c.id === character.id);
  
  character.updated_at = new Date().toISOString();
  
  if (existingIndex >= 0) {
    savedCharacters[existingIndex] = character;
  } else {
    savedCharacters.push(character);
  }
  
  localStorage.setItem('dnd_characters', JSON.stringify(savedCharacters));
};

export const getSavedCharacters = (): Character[] => {
  const saved = localStorage.getItem('dnd_characters');
  return saved ? JSON.parse(saved) : [];
};

export const loadCharacter = (id: string): Character | null => {
  const savedCharacters = getSavedCharacters();
  return savedCharacters.find(c => c.id === id) || null;
};

export const deleteCharacter = (id: string): void => {
  const savedCharacters = getSavedCharacters();
  const filtered = savedCharacters.filter(c => c.id !== id);
  localStorage.setItem('dnd_characters', JSON.stringify(filtered));
};