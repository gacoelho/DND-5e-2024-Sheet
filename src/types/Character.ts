export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface AbilityModifiers {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Race {
  id: string;
  name: string;
  name_pt: string;
  description: string;
  description_pt: string;
  ability_score_increases: Partial<AbilityScores>;
  size: string;
  speed: number;
  languages: string[];
  traits: string[];
  traits_pt: string[];
}

export interface CharacterClass {
  id: string;
  name: string;
  name_pt: string;
  description: string;
  description_pt: string;
  hit_die: number;
  primary_ability: string[];
  saving_throw_proficiencies: string[];
  skill_proficiencies: string[];
  equipment: string[];
  features: string[];
  features_pt: string[];
  spellcasting?: boolean | {
    ability: string;
    spell_save_dc: number;
    spell_attack_bonus: number;
  };
}

export interface Background {
  id: string;
  name: string;
  name_pt: string;
  description: string;
  description_pt: string;
  skill_proficiencies: string[];
  languages: string[];
  equipment: string[];
  features: string[];
  features_pt: string[];
}

export interface Item {
  id: string;
  name: string;
  name_pt: string;
  description: string;
  description_pt: string;
  type: string;
  weight: number;
  value: string;
  properties: string[];
  properties_pt: string[];
}

export interface Ability {
  id: string;
  name: string;
  name_pt: string;
  description: string;
  description_pt: string;
  type: string;
  level: number;
  source: string;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  race: Race;
  class: CharacterClass;
  background: Background;
  ability_scores: AbilityScores;
  ability_modifiers: AbilityModifiers;
  hit_points: number;
  max_hit_points: number;
  armor_class: number;
  initiative: number;
  speed: number;
  proficiency_bonus: number;
  saving_throws: string[];
  skills: { [key: string]: boolean };
  equipment: Item[];
  abilities: Ability[];
  spells: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CharacterData {
  races: Race[];
  classes: CharacterClass[];
  backgrounds: Background[];
  items: Item[];
  abilities: Ability[];
}

export type AbilityScoreMethod = 'standard_array' | 'point_buy' | 'roll_dice';

export interface CharacterCreationData {
  name: string;
  level: number;
  race_id: string;
  class_id: string;
  background_id: string;
  ability_scores: AbilityScores;
  ability_score_method: AbilityScoreMethod;
  equipment: string[];
  abilities: string[];
  notes: string;
}