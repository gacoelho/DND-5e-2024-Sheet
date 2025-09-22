# D&D 5e Character Creator

Um sistema completo para criação de fichas de personagem para Dungeons & Dragons 5ª edição (versão 2024), desenvolvido com React, TypeScript e Vite.

## 🚀 Demo

Acesse a aplicação em: [https://seu-usuario.github.io/dnd-character-creator](https://seu-usuario.github.io/dnd-character-creator)

## ✨ Funcionalidades

- ✅ Criação de personagens personalizados
- ✅ Seleção de raça, classe e antecedente
- ✅ Aplicação automática de regras e bônus
- ✅ Sistema de pontuação de habilidades flexível
- ✅ Interface responsiva com modo escuro
- ✅ Salvamento/carregamento local
- ✅ Exportação em PDF (em desenvolvimento)
- ✅ Suporte multilíngua (PT/EN)

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Export**: jsPDF
- **Deploy**: GitHub Pages

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/dnd-character-creator.git
cd dnd-character-creator
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador

## 🚀 Deploy

### GitHub Pages (Automático)

1. **Fork este repositório** no GitHub
2. **Ative o GitHub Pages** nas configurações do repositório
3. **Configure a branch de origem** para `gh-pages`
4. **Faça push** para a branch `main` - o deploy será automático!

### Deploy Manual

```bash
# Build do projeto
npm run build

# Deploy para GitHub Pages
npm run deploy
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   ├── CharacterCreator.tsx
│   │   └── CharacterSheet.tsx
│   ├── types/              # Definições TypeScript
│   │   └── Character.ts
│   ├── utils/              # Utilitários
│   │   ├── dataManager.ts
│   │   └── characterUtils.ts
│   ├── data/               # Dados do jogo
│   │   ├── races.json
│   │   ├── classes.json
│   │   └── backgrounds.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .github/workflows/      # GitHub Actions
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎮 Como Usar

1. **Acesse a aplicação** no seu navegador
2. **Clique em "Criar Personagem"** para começar
3. **Preencha as informações básicas** (nome, nível, raça, classe, antecedente)
4. **Configure as habilidades** usando um dos métodos disponíveis:
   - Array padrão (15, 14, 13, 12, 10, 8)
   - Compra por pontos (27 pontos)
   - Rolagem de dados (4d6, descarte o menor)
5. **Salve seu personagem** para acessá-lo posteriormente
6. **Visualize a ficha completa** na aba "Ficha do Personagem"
7. **Exporte para PDF** quando estiver satisfeito (em desenvolvimento)

## 🎯 Sistema de Habilidades

### Array Padrão
Valores fixos: 15, 14, 13, 12, 10, 8

### Compra por Pontos
- 27 pontos totais
- Custo por ponto: 8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9
- Máximo 15 antes dos bônus raciais

### Rolagem de Dados
- 4d6, descarte o menor
- Role 6 vezes e distribua como desejar

## 📚 Dados do Jogo

O sistema inclui dados completos de:

- **9 Raças**: Humano, Elfo, Anão, Pequenino, Draconato, Gnomo, Meio-Elfo, Meio-Orc, Tiefling
- **12 Classes**: Bárbaro, Bardo, Clérigo, Druida, Guerreiro, Monge, Paladino, Patrulheiro, Ladino, Feiticeiro, Bruxo, Mago
- **6 Antecedentes**: Acólito, Criminoso, Herói do Povo, Nobre, Sábio, Soldado

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Wizards of the Coast** pelo D&D 5e System Reference Document (SRD)
- **React Team** pela excelente biblioteca
- **Vite Team** pela ferramenta de build incrível
- **Tailwind CSS** pelo sistema de design utilitário

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor:

1. Abra uma [issue](https://github.com/seu-usuario/dnd-character-creator/issues)
2. Entre em contato via [email](mailto:seu-email@exemplo.com)

---

**Divirta-se criando seus personagens! 🎲⚔️**