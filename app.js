// Aplicação principal do D&D 5e Character Creator
class CharacterCreatorApp {
    constructor() {
        this.currentCharacter = null;
        this.abilityScores = {
            str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
        };
        this.abilityMethod = 'standard';
        this.customEquipment = [];
        this.customAbilities = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateSelects();
        this.setupThemeToggle();
        this.loadSavedCharacters();
    }

    setupEventListeners() {
        // Navegação principal
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Navegação do criador
        document.querySelectorAll('.creator-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchCreatorTab(e.target.dataset.creatorTab);
            });
        });

        // Seleção de raça
        document.getElementById('character-race').addEventListener('change', (e) => {
            this.onRaceChange(e.target.value);
        });

        // Seleção de classe
        document.getElementById('character-class').addEventListener('change', (e) => {
            this.onClassChange(e.target.value);
        });

        // Seleção de antecedente
        document.getElementById('character-background').addEventListener('change', (e) => {
            this.onBackgroundChange(e.target.value);
        });

        // Método de habilidades
        document.querySelectorAll('input[name="ability-method"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.onAbilityMethodChange(e.target.value);
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }

    populateSelects() {
        // Popula raças
        const raceSelect = document.getElementById('character-race');
        gameData.races.forEach(race => {
            const option = document.createElement('option');
            option.value = race.name;
            option.textContent = race.name;
            raceSelect.appendChild(option);
        });

        // Popula classes
        const classSelect = document.getElementById('character-class');
        gameData.classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.name;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });

        // Popula antecedentes
        const backgroundSelect = document.getElementById('character-background');
        gameData.backgrounds.forEach(background => {
            const option = document.createElement('option');
            option.value = background.name;
            option.textContent = background.name;
            backgroundSelect.appendChild(option);
        });

        // Inicializa habilidades
        this.initializeAbilities();
    }

    initializeAbilities() {
        const abilitiesGrid = document.getElementById('abilities-grid');
        abilitiesGrid.innerHTML = '';

        Object.entries(abilities).forEach(([key, name]) => {
            const abilityCard = document.createElement('div');
            abilityCard.className = 'ability-card';
            abilityCard.innerHTML = `
                <h4>${name}</h4>
                <div class="ability-score" id="score-${key}">10</div>
                <div class="ability-modifier" id="mod-${key}">+0</div>
                <div class="ability-controls">
                    <button onclick="app.decreaseAbility('${key}')">-</button>
                    <input type="number" id="input-${key}" value="10" min="8" max="15" 
                           onchange="app.updateAbility('${key}', this.value)">
                    <button onclick="app.increaseAbility('${key}')">+</button>
                </div>
            `;
            abilitiesGrid.appendChild(abilityCard);
        });

        this.updateAbilityMethod();
    }

    switchTab(tabName) {
        // Remove active de todas as tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Ativa a tab selecionada
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Se for a tab da ficha, atualiza a exibição
        if (tabName === 'sheet') {
            this.updateCharacterSheet();
        }
    }

    switchCreatorTab(tabName) {
        // Remove active de todas as tabs do criador
        document.querySelectorAll('.creator-tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.creator-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Ativa a tab selecionada
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-creator-tab="${tabName}"]`).classList.add('active');
    }

    onRaceChange(raceName) {
        if (!raceName) {
            document.getElementById('race-info').style.display = 'none';
            return;
        }

        const race = gameData.races.find(r => r.name === raceName);
        if (race) {
            this.displayRaceInfo(race);
            this.applyRaceBonuses(race);
        }
    }

    displayRaceInfo(race) {
        const raceInfo = document.getElementById('race-info');
        const raceDetails = document.getElementById('race-details');
        
        raceDetails.innerHTML = `
            <p><strong>Descrição:</strong> ${race.description}</p>
            <p><strong>Tamanho:</strong> ${race.size}</p>
            <p><strong>Velocidade:</strong> ${race.speed} pés</p>
            <p><strong>Idiomas:</strong> ${race.languages.join(', ')}</p>
            <h4>Características Raciais:</h4>
            <ul>
                ${race.features.map(feature => 
                    `<li><strong>${feature.name}:</strong> ${feature.description}</li>`
                ).join('')}
            </ul>
        `;
        
        raceInfo.style.display = 'block';
    }

    applyRaceBonuses(race) {
        // Aplica bônus de habilidades da raça
        Object.entries(race.ability_score_increases).forEach(([ability, bonus]) => {
            const currentScore = this.abilityScores[ability];
            this.abilityScores[ability] = currentScore + bonus;
            this.updateAbilityDisplay(ability);
        });
    }

    onClassChange(className) {
        if (!className) return;

        const characterClass = gameData.classes.find(c => c.name === className);
        if (characterClass) {
            this.displayStartingEquipment(characterClass);
            this.displayClassAbilities(characterClass);
        }
    }

    displayStartingEquipment(characterClass) {
        const equipmentDiv = document.getElementById('starting-equipment');
        equipmentDiv.innerHTML = `
            <h4>Equipamentos Iniciais da Classe:</h4>
            <ul>
                ${characterClass.equipment.map(item => 
                    `<li><strong>${item.name}:</strong> ${item.description} (${item.value})</li>`
                ).join('')}
            </ul>
        `;
    }

    displayClassAbilities(characterClass) {
        const abilitiesDiv = document.getElementById('class-abilities');
        abilitiesDiv.innerHTML = `
            <h4>Habilidades da Classe:</h4>
            <ul>
                ${characterClass.features.map(feature => 
                    `<li><strong>${feature.name}:</strong> ${feature.description}</li>`
                ).join('')}
            </ul>
        `;
    }

    onBackgroundChange(backgroundName) {
        if (!backgroundName) return;

        const background = gameData.backgrounds.find(b => b.name === backgroundName);
        if (background) {
            this.displayBackgroundInfo(background);
        }
    }

    displayBackgroundInfo(background) {
        // Aqui você pode adicionar lógica para exibir informações do antecedente
        console.log('Background selected:', background);
    }

    onAbilityMethodChange(method) {
        this.abilityMethod = method;
        this.updateAbilityMethod();
    }

    updateAbilityMethod() {
        if (this.abilityMethod === 'standard') {
            this.applyStandardArray();
        } else if (this.abilityMethod === 'point-buy') {
            this.resetToPointBuy();
        } else if (this.abilityMethod === 'roll') {
            this.rollAbilities();
        }
    }

    applyStandardArray() {
        const scores = [...standardArray];
        const abilityKeys = Object.keys(abilities);
        
        abilityKeys.forEach((ability, index) => {
            this.abilityScores[ability] = scores[index] || 8;
            this.updateAbilityDisplay(ability);
        });
    }

    resetToPointBuy() {
        Object.keys(abilities).forEach(ability => {
            this.abilityScores[ability] = 8;
            this.updateAbilityDisplay(ability);
        });
    }

    rollAbilities() {
        Object.keys(abilities).forEach(ability => {
            const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
            rolls.sort((a, b) => b - a);
            const score = rolls[0] + rolls[1] + rolls[2];
            this.abilityScores[ability] = score;
            this.updateAbilityDisplay(ability);
        });
    }

    updateAbility(ability, value) {
        const score = parseInt(value);
        if (score >= 8 && score <= 15) {
            this.abilityScores[ability] = score;
            this.updateAbilityDisplay(ability);
        }
    }

    increaseAbility(ability) {
        if (this.abilityScores[ability] < 15) {
            this.abilityScores[ability]++;
            this.updateAbilityDisplay(ability);
        }
    }

    decreaseAbility(ability) {
        if (this.abilityScores[ability] > 8) {
            this.abilityScores[ability]--;
            this.updateAbilityDisplay(ability);
        }
    }

    updateAbilityDisplay(ability) {
        const score = this.abilityScores[ability];
        const modifier = getAbilityModifier(score);
        
        document.getElementById(`score-${ability}`).textContent = score;
        document.getElementById(`mod-${ability}`).textContent = formatModifier(modifier);
        document.getElementById(`input-${ability}`).value = score;
    }

    createCharacter() {
        const name = document.getElementById('character-name').value;
        const level = parseInt(document.getElementById('character-level').value) || 1;
        const raceName = document.getElementById('character-race').value;
        const className = document.getElementById('character-class').value;
        const backgroundName = document.getElementById('character-background').value;

        if (!name || !raceName || !className || !backgroundName) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const race = gameData.races.find(r => r.name === raceName);
        const characterClass = gameData.classes.find(c => c.name === className);
        const background = gameData.backgrounds.find(b => b.name === backgroundName);

        this.currentCharacter = {
            name,
            level,
            race,
            class: characterClass,
            background,
            abilityScores: { ...this.abilityScores },
            equipment: [...characterClass.equipment, ...this.customEquipment],
            abilities: [...race.features, ...characterClass.features, ...this.customAbilities],
            createdAt: new Date().toISOString()
        };

        this.updateCharacterSheet();
        this.switchTab('sheet');
        
        // Salva automaticamente
        this.saveCharacter();
    }

    updateCharacterSheet() {
        if (!this.currentCharacter) {
            document.getElementById('no-character').style.display = 'block';
            document.getElementById('character-sheet').style.display = 'none';
            return;
        }

        document.getElementById('no-character').style.display = 'none';
        document.getElementById('character-sheet').style.display = 'block';

        // Atualiza informações básicas
        document.getElementById('sheet-name').textContent = this.currentCharacter.name;
        document.getElementById('sheet-character-name').textContent = this.currentCharacter.name;
        document.getElementById('sheet-level').textContent = this.currentCharacter.level;
        document.getElementById('sheet-race').textContent = this.currentCharacter.race.name;
        document.getElementById('sheet-class').textContent = this.currentCharacter.class.name;
        document.getElementById('sheet-background').textContent = this.currentCharacter.background.name;

        // Atualiza habilidades
        this.updateAbilitiesDisplay();

        // Atualiza equipamentos
        this.updateEquipmentDisplay();

        // Atualiza habilidades especiais
        this.updateSpecialAbilitiesDisplay();
    }

    updateAbilitiesDisplay() {
        const abilitiesDisplay = document.getElementById('abilities-display');
        abilitiesDisplay.innerHTML = '';

        Object.entries(abilities).forEach(([key, name]) => {
            const score = this.currentCharacter.abilityScores[key];
            const modifier = getAbilityModifier(score);
            
            const abilityDiv = document.createElement('div');
            abilityDiv.className = 'ability-display';
            abilityDiv.innerHTML = `
                <h4>${name}</h4>
                <div class="score">${score}</div>
                <div class="modifier">${formatModifier(modifier)}</div>
            `;
            abilitiesDisplay.appendChild(abilityDiv);
        });
    }

    updateEquipmentDisplay() {
        const equipmentDisplay = document.getElementById('equipment-display');
        equipmentDisplay.innerHTML = '';

        this.currentCharacter.equipment.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'equipment-item';
            itemDiv.innerHTML = `
                <strong>${item.name}</strong> - ${item.description} (${item.value})
            `;
            equipmentDisplay.appendChild(itemDiv);
        });
    }

    updateSpecialAbilitiesDisplay() {
        const abilitiesDisplay = document.getElementById('special-abilities-display');
        abilitiesDisplay.innerHTML = '';

        this.currentCharacter.abilities.forEach(ability => {
            const abilityDiv = document.createElement('div');
            abilityDiv.className = 'special-ability';
            abilityDiv.innerHTML = `
                <h4>${ability.name}</h4>
                <p>${ability.description}</p>
            `;
            abilitiesDisplay.appendChild(abilityDiv);
        });
    }

    addCustomEquipment() {
        const name = document.getElementById('equipment-name').value;
        const description = document.getElementById('equipment-description').value;

        if (!name || !description) {
            alert('Por favor, preencha nome e descrição do equipamento.');
            return;
        }

        const equipment = {
            name,
            description,
            item_type: 'custom',
            weight: 0,
            value: '0 gp'
        };

        this.customEquipment.push(equipment);
        this.updateCustomEquipmentDisplay();

        // Limpa os campos
        document.getElementById('equipment-name').value = '';
        document.getElementById('equipment-description').value = '';
    }

    updateCustomEquipmentDisplay() {
        const customEquipmentDiv = document.getElementById('custom-equipment');
        customEquipmentDiv.innerHTML = '';

        this.customEquipment.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'equipment-item';
            itemDiv.innerHTML = `
                <strong>${item.name}</strong> - ${item.description}
                <button onclick="app.removeCustomEquipment(${index})" class="remove-btn">Remover</button>
            `;
            customEquipmentDiv.appendChild(itemDiv);
        });
    }

    removeCustomEquipment(index) {
        this.customEquipment.splice(index, 1);
        this.updateCustomEquipmentDisplay();
    }

    addCustomAbility() {
        const name = document.getElementById('ability-name').value;
        const description = document.getElementById('ability-description').value;

        if (!name || !description) {
            alert('Por favor, preencha nome e descrição da habilidade.');
            return;
        }

        const ability = {
            name,
            description,
            ability_type: 'custom'
        };

        this.customAbilities.push(ability);
        this.updateCustomAbilitiesDisplay();

        // Limpa os campos
        document.getElementById('ability-name').value = '';
        document.getElementById('ability-description').value = '';
    }

    updateCustomAbilitiesDisplay() {
        const customAbilitiesDiv = document.getElementById('custom-abilities');
        customAbilitiesDiv.innerHTML = '';

        this.customAbilities.forEach((ability, index) => {
            const abilityDiv = document.createElement('div');
            abilityDiv.className = 'special-ability';
            abilityDiv.innerHTML = `
                <h4>${ability.name}</h4>
                <p>${ability.description}</p>
                <button onclick="app.removeCustomAbility(${index})" class="remove-btn">Remover</button>
            `;
            customAbilitiesDiv.appendChild(abilityDiv);
        });
    }

    removeCustomAbility(index) {
        this.customAbilities.splice(index, 1);
        this.updateCustomAbilitiesDisplay();
    }

    saveCharacter() {
        if (!this.currentCharacter) return;

        const characterData = JSON.stringify(this.currentCharacter, null, 2);
        const blob = new Blob([characterData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentCharacter.name}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Salva no localStorage também
        const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        savedCharacters.push(this.currentCharacter);
        localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
        
        this.loadSavedCharacters();
    }

    loadCharacter(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const characterData = JSON.parse(e.target.result);
                this.currentCharacter = characterData;
                this.updateCharacterSheet();
                this.switchTab('sheet');
            } catch (error) {
                alert('Erro ao carregar o personagem. Verifique se o arquivo é válido.');
            }
        };
        reader.readAsText(file);
    }

    loadSavedCharacters() {
        const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        const savedCharactersDiv = document.getElementById('saved-characters');
        
        if (savedCharacters.length === 0) {
            savedCharactersDiv.innerHTML = '<p>Nenhum personagem salvo.</p>';
            return;
        }

        savedCharactersDiv.innerHTML = '';
        savedCharacters.forEach((character, index) => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'saved-character';
            characterDiv.innerHTML = `
                <div class="character-info">
                    <h4>${character.name}</h4>
                    <p>Nível ${character.level} ${character.race.name} ${character.class.name}</p>
                    <small>${new Date(character.createdAt).toLocaleDateString()}</small>
                </div>
                <div class="character-actions">
                    <button onclick="app.loadSavedCharacter(${index})" class="load-btn">Carregar</button>
                    <button onclick="app.deleteSavedCharacter(${index})" class="delete-btn">Excluir</button>
                </div>
            `;
            savedCharactersDiv.appendChild(characterDiv);
        });
    }

    loadSavedCharacter(index) {
        const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        if (index >= 0 && index < savedCharacters.length) {
            this.currentCharacter = savedCharacters[index];
            this.updateCharacterSheet();
            this.switchTab('sheet');
        }
    }

    deleteSavedCharacter(index) {
        if (confirm('Tem certeza que deseja excluir este personagem?')) {
            const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
            savedCharacters.splice(index, 1);
            localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
            this.loadSavedCharacters();
        }
    }

    exportToPDF() {
        if (!this.currentCharacter) return;
        
        // Implementação básica de exportação para PDF
        const printWindow = window.open('', '_blank');
        const character = this.currentCharacter;
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Ficha de ${character.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                    .section { margin-bottom: 20px; }
                    .abilities { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
                    .ability { text-align: center; border: 1px solid #000; padding: 10px; }
                    .equipment, .abilities-list { margin-left: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${character.name}</h1>
                    <p>Nível ${character.level} ${character.race.name} ${character.class.name}</p>
                </div>
                
                <div class="section">
                    <h2>Habilidades</h2>
                    <div class="abilities">
                        ${Object.entries(abilities).map(([key, name]) => {
                            const score = character.abilityScores[key];
                            const modifier = getAbilityModifier(score);
                            return `
                                <div class="ability">
                                    <strong>${name}</strong><br>
                                    ${score} (${formatModifier(modifier)})
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Equipamentos</h2>
                    <div class="equipment">
                        ${character.equipment.map(item => `<p><strong>${item.name}:</strong> ${item.description}</p>`).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Habilidades Especiais</h2>
                    <div class="abilities-list">
                        ${character.abilities.map(ability => `<p><strong>${ability.name}:</strong> ${ability.description}</p>`).join('')}
                    </div>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
    }

    printSheet() {
        window.print();
    }
}

// Funções globais para compatibilidade com HTML
function switchTab(tabName) {
    app.switchTab(tabName);
}

function addCustomEquipment() {
    app.addCustomEquipment();
}

function addCustomAbility() {
    app.addCustomAbility();
}

function saveCharacter() {
    app.saveCharacter();
}

function loadCharacter(event) {
    app.loadCharacter(event);
}

function exportToPDF() {
    app.exportToPDF();
}

function printSheet() {
    app.printSheet();
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CharacterCreatorApp();
});