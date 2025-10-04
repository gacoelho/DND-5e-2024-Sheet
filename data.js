// Dados das raças, classes e antecedentes para D&D 5e
const gameData = {
    races: [
        {
            name: "Human",
            description: "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
            ability_score_increases: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
            size: "Medium",
            speed: 30,
            languages: ["Common"],
            features: [
                {
                    name: "Extra Language",
                    description: "You can speak, read, and write one extra language of your choice.",
                    ability_type: "racial"
                }
            ],
            subraces: []
        },
        {
            name: "Elf",
            description: "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.",
            ability_score_increases: { dex: 2 },
            size: "Medium",
            speed: 30,
            languages: ["Common", "Elvish"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Fey Ancestry",
                    description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                    ability_type: "racial"
                },
                {
                    name: "Trance",
                    description: "You don't need to sleep. Instead, you meditate deeply, remaining semiconscious, for 4 hours a day.",
                    ability_type: "racial"
                }
            ],
            subraces: ["High Elf", "Wood Elf", "Dark Elf (Drow)"]
        },
        {
            name: "Dwarf",
            description: "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
            ability_score_increases: { con: 2 },
            size: "Medium",
            speed: 25,
            languages: ["Common", "Dwarvish"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Dwarven Resilience",
                    description: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
                    ability_type: "racial"
                },
                {
                    name: "Stonecunning",
                    description: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check.",
                    ability_type: "racial"
                }
            ],
            subraces: ["Hill Dwarf", "Mountain Dwarf"]
        },
        {
            name: "Halfling",
            description: "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.",
            ability_score_increases: { dex: 2 },
            size: "Small",
            speed: 25,
            languages: ["Common", "Halfling"],
            features: [
                {
                    name: "Lucky",
                    description: "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
                    ability_type: "racial"
                },
                {
                    name: "Brave",
                    description: "You have advantage on saving throws against being frightened.",
                    ability_type: "racial"
                },
                {
                    name: "Halfling Nimbleness",
                    description: "You can move through the space of any creature that is of a size larger than yours.",
                    ability_type: "racial"
                }
            ],
            subraces: ["Lightfoot", "Stout"]
        },
        {
            name: "Dragonborn",
            description: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension.",
            ability_score_increases: { str: 2, cha: 1 },
            size: "Medium",
            speed: 30,
            languages: ["Common", "Draconic"],
            features: [
                {
                    name: "Breath Weapon",
                    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.",
                    ability_type: "racial"
                },
                {
                    name: "Damage Resistance",
                    description: "You have resistance to the damage type associated with your draconic ancestry.",
                    ability_type: "racial"
                }
            ],
            subraces: []
        },
        {
            name: "Gnome",
            description: "A gnome's energy and enthusiasm for living shines through every inch of his or her tiny body.",
            ability_score_increases: { int: 2 },
            size: "Small",
            speed: 25,
            languages: ["Common", "Gnomish"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Gnome Cunning",
                    description: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
                    ability_type: "racial"
                }
            ],
            subraces: ["Forest Gnome", "Rock Gnome"]
        },
        {
            name: "Half-Elf",
            description: "Half-elves combine what some say are the best qualities of their elf and human parents.",
            ability_score_increases: { cha: 2 },
            size: "Medium",
            speed: 30,
            languages: ["Common", "Elvish"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Fey Ancestry",
                    description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                    ability_type: "racial"
                },
                {
                    name: "Two Skill Proficiencies",
                    description: "You gain proficiency in two skills of your choice.",
                    ability_type: "racial"
                }
            ],
            subraces: []
        },
        {
            name: "Half-Orc",
            description: "Half-orcs' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see.",
            ability_score_increases: { str: 2, con: 1 },
            size: "Medium",
            speed: 30,
            languages: ["Common", "Orc"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Relentless Endurance",
                    description: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
                    ability_type: "racial"
                },
                {
                    name: "Savage Attacks",
                    description: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
                    ability_type: "racial"
                }
            ],
            subraces: []
        },
        {
            name: "Tiefling",
            description: "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling.",
            ability_score_increases: { int: 1, cha: 2 },
            size: "Medium",
            speed: 30,
            languages: ["Common", "Infernal"],
            features: [
                {
                    name: "Darkvision",
                    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
                    ability_type: "racial"
                },
                {
                    name: "Hellish Resistance",
                    description: "You have resistance to fire damage.",
                    ability_type: "racial"
                },
                {
                    name: "Infernal Legacy",
                    description: "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell once per day. When you reach 5th level, you can also cast the darkness spell once per day.",
                    ability_type: "racial"
                }
            ],
            subraces: []
        }
    ],
    
    classes: [
        {
            name: "Barbarian",
            hit_die: 12,
            primary_ability: "str",
            saving_throw_proficiencies: ["str", "con"],
            skill_proficiencies: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
            equipment: [
                {
                    name: "Greataxe",
                    item_type: "weapon",
                    description: "A two-handed axe",
                    weight: 7.0,
                    value: "30 gp"
                },
                {
                    name: "Handaxe",
                    item_type: "weapon", 
                    description: "A light throwing axe",
                    weight: 2.0,
                    value: "5 gp"
                },
                {
                    name: "Explorer's Pack",
                    item_type: "equipment",
                    description: "Backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days of rations, waterskin, 50 feet of hempen rope",
                    weight: 59.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Rage",
                    description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.",
                    ability_type: "class"
                },
                {
                    name: "Unarmored Defense",
                    description: "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier.",
                    ability_type: "class"
                }
            ],
            spellcasting: false,
            spellcasting_ability: null,
            subclasses: ["Path of the Berserker", "Path of the Totem Warrior"]
        },
        {
            name: "Bard",
            hit_die: 8,
            primary_ability: "cha",
            saving_throw_proficiencies: ["dex", "cha"],
            skill_proficiencies: ["Animal Handling", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
            equipment: [
                {
                    name: "Rapier",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 2.0,
                    value: "25 gp"
                },
                {
                    name: "Diplomat's Pack",
                    item_type: "equipment",
                    description: "Chest, 2 cases for maps and scrolls, fine clothes, ink, ink pen, lamp, 2 flasks of oil, paper, perfume, sealing wax, soap",
                    weight: 39.0,
                    value: "39 gp"
                },
                {
                    name: "Lute",
                    item_type: "tool",
                    description: "A musical instrument",
                    weight: 2.0,
                    value: "35 gp"
                }
            ],
            features: [
                {
                    name: "Spellcasting",
                    description: "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music.",
                    ability_type: "class"
                },
                {
                    name: "Bardic Inspiration",
                    description: "You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "cha",
            subclasses: ["College of Lore", "College of Valor"]
        },
        {
            name: "Cleric",
            hit_die: 8,
            primary_ability: "wis",
            saving_throw_proficiencies: ["wis", "cha"],
            skill_proficiencies: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
            equipment: [
                {
                    name: "Mace",
                    item_type: "weapon",
                    description: "A simple melee weapon",
                    weight: 4.0,
                    value: "5 gp"
                },
                {
                    name: "Scale Mail",
                    item_type: "armor",
                    description: "Medium armor",
                    weight: 45.0,
                    value: "50 gp"
                },
                {
                    name: "Priest's Pack",
                    item_type: "equipment",
                    description: "Backpack, blanket, 10 candles, tinderbox, alms box, 2 blocks of incense, censer, vestments, 2 days of rations, waterskin",
                    weight: 25.0,
                    value: "19 gp"
                }
            ],
            features: [
                {
                    name: "Spellcasting",
                    description: "As a conduit for divine power, you can cast cleric spells.",
                    ability_type: "class"
                },
                {
                    name: "Divine Domain",
                    description: "Choose one domain related to your deity: Knowledge, Life, Light, Nature, Tempest, Trickery, or War.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "wis",
            subclasses: ["Knowledge Domain", "Life Domain", "Light Domain", "Nature Domain", "Tempest Domain", "Trickery Domain", "War Domain"]
        },
        {
            name: "Druid",
            hit_die: 8,
            primary_ability: "wis",
            saving_throw_proficiencies: ["int", "wis"],
            skill_proficiencies: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
            equipment: [
                {
                    name: "Scimitar",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 3.0,
                    value: "25 gp"
                },
                {
                    name: "Leather Armor",
                    item_type: "armor",
                    description: "Light armor",
                    weight: 10.0,
                    value: "10 gp"
                },
                {
                    name: "Explorer's Pack",
                    item_type: "equipment",
                    description: "Backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days of rations, waterskin, 50 feet of hempen rope",
                    weight: 59.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Spellcasting",
                    description: "Drawing on the divine essence of nature itself, you can cast spells to shape that essence.",
                    ability_type: "class"
                },
                {
                    name: "Wild Shape",
                    description: "Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "wis",
            subclasses: ["Circle of the Land", "Circle of the Moon"]
        },
        {
            name: "Fighter",
            hit_die: 10,
            primary_ability: "str",
            saving_throw_proficiencies: ["str", "con"],
            skill_proficiencies: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
            equipment: [
                {
                    name: "Chain Mail",
                    item_type: "armor",
                    description: "Heavy armor",
                    weight: 55.0,
                    value: "75 gp"
                },
                {
                    name: "Shield",
                    item_type: "armor",
                    description: "A shield",
                    weight: 6.0,
                    value: "10 gp"
                },
                {
                    name: "Longsword",
                    item_type: "weapon",
                    description: "A versatile melee weapon",
                    weight: 3.0,
                    value: "15 gp"
                }
            ],
            features: [
                {
                    name: "Fighting Style",
                    description: "You adopt a particular style of fighting as your specialty. Choose one of the fighting styles.",
                    ability_type: "class"
                },
                {
                    name: "Second Wind",
                    description: "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.",
                    ability_type: "class"
                }
            ],
            spellcasting: false,
            spellcasting_ability: null,
            subclasses: ["Champion", "Battle Master", "Eldritch Knight"]
        },
        {
            name: "Monk",
            hit_die: 8,
            primary_ability: "dex",
            saving_throw_proficiencies: ["str", "dex"],
            skill_proficiencies: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
            equipment: [
                {
                    name: "Shortsword",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 2.0,
                    value: "10 gp"
                },
                {
                    name: "Dungeoneer's Pack",
                    item_type: "equipment",
                    description: "Backpack, crowbar, hammer, 10 pitons, 10 torches, tinderbox, 10 days of rations, waterskin, 50 feet of hempen rope",
                    weight: 61.5,
                    value: "12 gp"
                }
            ],
            features: [
                {
                    name: "Unarmored Defense",
                    description: "Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.",
                    ability_type: "class"
                },
                {
                    name: "Martial Arts",
                    description: "At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons.",
                    ability_type: "class"
                }
            ],
            spellcasting: false,
            spellcasting_ability: null,
            subclasses: ["Way of the Open Hand", "Way of Shadow", "Way of the Four Elements"]
        },
        {
            name: "Paladin",
            hit_die: 10,
            primary_ability: "str",
            saving_throw_proficiencies: ["wis", "cha"],
            skill_proficiencies: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
            equipment: [
                {
                    name: "Chain Mail",
                    item_type: "armor",
                    description: "Heavy armor",
                    weight: 55.0,
                    value: "75 gp"
                },
                {
                    name: "Shield",
                    item_type: "armor",
                    description: "A shield",
                    weight: 6.0,
                    value: "10 gp"
                },
                {
                    name: "Longsword",
                    item_type: "weapon",
                    description: "A versatile melee weapon",
                    weight: 3.0,
                    value: "15 gp"
                }
            ],
            features: [
                {
                    name: "Divine Sense",
                    description: "The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears.",
                    ability_type: "class"
                },
                {
                    name: "Lay on Hands",
                    description: "Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "cha",
            subclasses: ["Oath of Devotion", "Oath of the Ancients", "Oath of Vengeance"]
        },
        {
            name: "Ranger",
            hit_die: 10,
            primary_ability: "dex",
            saving_throw_proficiencies: ["str", "dex"],
            skill_proficiencies: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
            equipment: [
                {
                    name: "Scale Mail",
                    item_type: "armor",
                    description: "Medium armor",
                    weight: 45.0,
                    value: "50 gp"
                },
                {
                    name: "Longbow",
                    item_type: "weapon",
                    description: "A ranged weapon",
                    weight: 2.0,
                    value: "50 gp"
                },
                {
                    name: "Explorer's Pack",
                    item_type: "equipment",
                    description: "Backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days of rations, waterskin, 50 feet of hempen rope",
                    weight: 59.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Favored Enemy",
                    description: "Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.",
                    ability_type: "class"
                },
                {
                    name: "Natural Explorer",
                    description: "You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "wis",
            subclasses: ["Beast Master", "Hunter"]
        },
        {
            name: "Rogue",
            hit_die: 8,
            primary_ability: "dex",
            saving_throw_proficiencies: ["dex", "int"],
            skill_proficiencies: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
            equipment: [
                {
                    name: "Rapier",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 2.0,
                    value: "25 gp"
                },
                {
                    name: "Shortbow",
                    item_type: "weapon",
                    description: "A ranged weapon",
                    weight: 2.0,
                    value: "25 gp"
                },
                {
                    name: "Burglar's Pack",
                    item_type: "equipment",
                    description: "Backpack, 1000 ball bearings, 10 feet of string, bell, 5 candles, crowbar, hammer, 10 pitons, hooded lantern, 2 flasks of oil, 5 days of rations, tinderbox, waterskin, 50 feet of hempen rope",
                    weight: 46.5,
                    value: "16 gp"
                }
            ],
            features: [
                {
                    name: "Expertise",
                    description: "At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves' tools.",
                    ability_type: "class"
                },
                {
                    name: "Sneak Attack",
                    description: "Beginning at 1st level, you know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll.",
                    ability_type: "class"
                },
                {
                    name: "Thieves' Cant",
                    description: "During your rogue training you learned thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.",
                    ability_type: "class"
                }
            ],
            spellcasting: false,
            spellcasting_ability: null,
            subclasses: ["Thief", "Assassin", "Arcane Trickster"]
        },
        {
            name: "Sorcerer",
            hit_die: 6,
            primary_ability: "cha",
            saving_throw_proficiencies: ["con", "cha"],
            skill_proficiencies: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
            equipment: [
                {
                    name: "Dagger",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 1.0,
                    value: "2 gp"
                },
                {
                    name: "Dungeoneer's Pack",
                    item_type: "equipment",
                    description: "Backpack, crowbar, hammer, 10 pitons, 10 torches, tinderbox, 10 days of rations, waterskin, 50 feet of hempen rope",
                    weight: 61.5,
                    value: "12 gp"
                }
            ],
            features: [
                {
                    name: "Spellcasting",
                    description: "An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic.",
                    ability_type: "class"
                },
                {
                    name: "Sorcerous Origin",
                    description: "Choose a sorcerous origin, which describes the source of your innate magical power.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "cha",
            subclasses: ["Draconic Bloodline", "Wild Magic"]
        },
        {
            name: "Warlock",
            hit_die: 8,
            primary_ability: "cha",
            saving_throw_proficiencies: ["wis", "cha"],
            skill_proficiencies: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
            equipment: [
                {
                    name: "Light Crossbow",
                    item_type: "weapon",
                    description: "A ranged weapon",
                    weight: 5.0,
                    value: "25 gp"
                },
                {
                    name: "Scholar's Pack",
                    item_type: "equipment",
                    description: "Backpack, book of lore, ink, ink pen, 10 sheets of parchment, little bag of sand, small knife",
                    weight: 10.0,
                    value: "40 gp"
                }
            ],
            features: [
                {
                    name: "Otherworldly Patron",
                    description: "At 1st level, you have struck a bargain with an otherworldly being of your choice.",
                    ability_type: "class"
                },
                {
                    name: "Pact Magic",
                    description: "Your arcane research and the magic bestowed on you by your patron have given you facility with spells.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "cha",
            subclasses: ["The Fiend", "The Great Old One", "The Archfey"]
        },
        {
            name: "Wizard",
            hit_die: 6,
            primary_ability: "int",
            saving_throw_proficiencies: ["int", "wis"],
            skill_proficiencies: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
            equipment: [
                {
                    name: "Dagger",
                    item_type: "weapon",
                    description: "A finesse weapon",
                    weight: 1.0,
                    value: "2 gp"
                },
                {
                    name: "Scholar's Pack",
                    item_type: "equipment",
                    description: "Backpack, book of lore, ink, ink pen, 10 sheets of parchment, little bag of sand, small knife",
                    weight: 10.0,
                    value: "40 gp"
                }
            ],
            features: [
                {
                    name: "Spellcasting",
                    description: "As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.",
                    ability_type: "class"
                },
                {
                    name: "Arcane Recovery",
                    description: "You have learned to recover some of your magical energy by studying your spellbook.",
                    ability_type: "class"
                }
            ],
            spellcasting: true,
            spellcasting_ability: "int",
            subclasses: ["School of Abjuration", "School of Conjuration", "School of Divination", "School of Enchantment", "School of Evocation", "School of Illusion", "School of Necromancy", "School of Transmutation"]
        }
    ],
    
    backgrounds: [
        {
            name: "Acolyte",
            description: "You have spent your life in the service of a temple to a specific god or pantheon of gods.",
            skill_proficiencies: ["Insight", "Religion"],
            tool_proficiencies: [],
            languages: ["Two of your choice"],
            equipment: [
                {
                    name: "Holy Symbol",
                    item_type: "tool",
                    description: "A holy symbol (a gift to you when you entered the priesthood)",
                    weight: 1.0,
                    value: "5 gp"
                },
                {
                    name: "Prayer Book",
                    item_type: "tool",
                    description: "A prayer book or prayer wheel",
                    weight: 2.0,
                    value: "25 gp"
                },
                {
                    name: "Incense",
                    item_type: "equipment",
                    description: "5 sticks of incense",
                    weight: 0.0,
                    value: "0.25 gp"
                },
                {
                    name: "Common Clothes",
                    item_type: "equipment",
                    description: "Common clothes",
                    weight: 3.0,
                    value: "5 sp"
                },
                {
                    name: "Pouch",
                    item_type: "equipment",
                    description: "A belt pouch with 15 gp",
                    weight: 1.0,
                    value: "15 gp"
                }
            ],
            features: [
                {
                    name: "Shelter of the Faithful",
                    description: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity.",
                    ability_type: "background"
                }
            ]
        },
        {
            name: "Criminal",
            description: "You are an experienced criminal with a history of breaking the law.",
            skill_proficiencies: ["Deception", "Stealth"],
            tool_proficiencies: ["One type of gaming set", "Thieves' tools"],
            languages: [],
            equipment: [
                {
                    name: "Crowbar",
                    item_type: "tool",
                    description: "A crowbar",
                    weight: 5.0,
                    value: "2 gp"
                },
                {
                    name: "Dark Common Clothes",
                    item_type: "equipment",
                    description: "Dark common clothes with a hood",
                    weight: 3.0,
                    value: "5 sp"
                },
                {
                    name: "Belt Pouch",
                    item_type: "equipment",
                    description: "A belt pouch with 15 gp",
                    weight: 1.0,
                    value: "15 gp"
                }
            ],
            features: [
                {
                    name: "Criminal Contact",
                    description: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
                    ability_type: "background"
                }
            ]
        },
        {
            name: "Folk Hero",
            description: "You come from a humble social rank, but you are destined for so much more.",
            skill_proficiencies: ["Animal Handling", "Survival"],
            tool_proficiencies: ["One type of artisan's tools", "Vehicles (land)"],
            languages: [],
            equipment: [
                {
                    name: "Artisan's Tools",
                    item_type: "tool",
                    description: "A set of artisan's tools (one of your choice)",
                    weight: 5.0,
                    value: "10 gp"
                },
                {
                    name: "Shovel",
                    item_type: "tool",
                    description: "A shovel",
                    weight: 5.0,
                    value: "2 gp"
                },
                {
                    name: "Iron Pot",
                    item_type: "equipment",
                    description: "An iron pot",
                    weight: 10.0,
                    value: "2 gp"
                },
                {
                    name: "Common Clothes",
                    item_type: "equipment",
                    description: "Common clothes",
                    weight: 3.0,
                    value: "5 sp"
                },
                {
                    name: "Belt Pouch",
                    item_type: "equipment",
                    description: "A belt pouch with 10 gp",
                    weight: 1.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Rustic Hospitality",
                    description: "Since you come from the ranks of the common folk, you fit in among them with ease.",
                    ability_type: "background"
                }
            ]
        },
        {
            name: "Noble",
            description: "You understand wealth, power, and privilege.",
            skill_proficiencies: ["History", "Persuasion"],
            tool_proficiencies: ["One type of gaming set"],
            languages: ["One of your choice"],
            equipment: [
                {
                    name: "Signet Ring",
                    item_type: "equipment",
                    description: "A signet ring",
                    weight: 0.0,
                    value: "5 gp"
                },
                {
                    name: "Scroll of Pedigree",
                    item_type: "equipment",
                    description: "A scroll of pedigree",
                    weight: 0.0,
                    value: "25 gp"
                },
                {
                    name: "Purse",
                    item_type: "equipment",
                    description: "A purse with 25 gp",
                    weight: 1.0,
                    value: "25 gp"
                }
            ],
            features: [
                {
                    name: "Position of Privilege",
                    description: "Thanks to your noble birth, people are inclined to think the best of you.",
                    ability_type: "background"
                }
            ]
        },
        {
            name: "Sage",
            description: "You spent years learning the lore of the multiverse.",
            skill_proficiencies: ["Arcana", "History"],
            tool_proficiencies: [],
            languages: ["Two of your choice"],
            equipment: [
                {
                    name: "Ink",
                    item_type: "equipment",
                    description: "A bottle of black ink",
                    weight: 0.0,
                    value: "10 gp"
                },
                {
                    name: "Quill",
                    item_type: "equipment",
                    description: "A quill",
                    weight: 0.0,
                    value: "2 cp"
                },
                {
                    name: "Small Knife",
                    item_type: "weapon",
                    description: "A small knife",
                    weight: 1.0,
                    value: "1 gp"
                },
                {
                    name: "Letter from a Dead Colleague",
                    item_type: "equipment",
                    description: "A letter from a dead colleague posing a question you have not yet been able to answer",
                    weight: 0.0,
                    value: "0 gp"
                },
                {
                    name: "Common Clothes",
                    item_type: "equipment",
                    description: "Common clothes",
                    weight: 3.0,
                    value: "5 sp"
                },
                {
                    name: "Belt Pouch",
                    item_type: "equipment",
                    description: "A belt pouch with 10 gp",
                    weight: 1.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Researcher",
                    description: "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it.",
                    ability_type: "background"
                }
            ]
        },
        {
            name: "Soldier",
            description: "War has been your life for as long as you care to remember.",
            skill_proficiencies: ["Athletics", "Intimidation"],
            tool_proficiencies: ["One type of gaming set", "Vehicles (land)"],
            languages: [],
            equipment: [
                {
                    name: "Insignia of Rank",
                    item_type: "equipment",
                    description: "An insignia of rank",
                    weight: 0.0,
                    value: "0 gp"
                },
                {
                    name: "Trophy",
                    item_type: "equipment",
                    description: "A trophy taken from a fallen enemy (a dagger, broken blade, or piece of a banner)",
                    weight: 1.0,
                    value: "10 gp"
                },
                {
                    name: "Bone Dice",
                    item_type: "tool",
                    description: "A set of bone dice or deck of cards",
                    weight: 0.0,
                    value: "1 sp"
                },
                {
                    name: "Common Clothes",
                    item_type: "equipment",
                    description: "Common clothes",
                    weight: 3.0,
                    value: "5 sp"
                },
                {
                    name: "Belt Pouch",
                    item_type: "equipment",
                    description: "A belt pouch with 10 gp",
                    weight: 1.0,
                    value: "10 gp"
                }
            ],
            features: [
                {
                    name: "Military Rank",
                    description: "You have a military rank from your career as a soldier.",
                    ability_type: "background"
                }
            ]
        }
    ]
};

// Habilidades básicas do D&D 5e
const abilities = {
    str: "Força",
    dex: "Destreza", 
    con: "Constituição",
    int: "Inteligência",
    wis: "Sabedoria",
    cha: "Carisma"
};

// Array padrão de habilidades
const standardArray = [15, 14, 13, 12, 10, 8];

// Custo de pontos para compra de habilidades
const pointBuyCosts = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

// Função para calcular modificador de habilidade
function getAbilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Função para formatar modificador
function formatModifier(modifier) {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}