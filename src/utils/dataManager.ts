import { CharacterData, Race, CharacterClass, Background, Item, Ability } from '../types/Character';

class DataManager {
  private races: Race[] = [];
  private classes: CharacterClass[] = [];
  private backgrounds: Background[] = [];
  private items: Item[] = [];
  private abilities: Ability[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const [racesData, classesData, backgroundsData] = await Promise.all([
        import('../data/races.json'),
        import('../data/classes.json'),
        import('../data/backgrounds.json')
      ]);

      this.races = racesData.races;
      this.classes = classesData.classes;
      this.backgrounds = backgroundsData.backgrounds;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  getRaces(): Race[] {
    return this.races;
  }

  getClasses(): CharacterClass[] {
    return this.classes;
  }

  getBackgrounds(): Background[] {
    return this.backgrounds;
  }

  getRaceById(id: string): Race | undefined {
    return this.races.find(race => race.id === id);
  }

  getClassById(id: string): CharacterClass | undefined {
    return this.classes.find(cls => cls.id === id);
  }

  getBackgroundById(id: string): Background | undefined {
    return this.backgrounds.find(bg => bg.id === id);
  }

  getAllData(): CharacterData {
    return {
      races: this.races,
      classes: this.classes,
      backgrounds: this.backgrounds,
      items: this.items,
      abilities: this.abilities
    };
  }
}

export default DataManager;