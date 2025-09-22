# Sistema de Criação de Fichas de Personagem D&D 5e (2024)

Um sistema completo para criação de fichas de personagem para Dungeons & Dragons 5ª edição (versão 2024), desenvolvido em Python com interface Streamlit.

## Funcionalidades

- ✅ Criação de personagens personalizados
- ✅ Seleção de raça, classe e antecedente
- ✅ Aplicação automática de regras e bônus
- ✅ Sistema de itens e habilidades manuais
- ✅ Interface responsiva com dark mode
- ✅ Salvamento/carregamento em JSON
- ✅ Exportação em PDF
- ✅ Suporte multilíngua (PT/EN)

## Como usar

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Execute o aplicativo:
```bash
streamlit run app.py
```

## Deploy

O aplicativo está configurado para deploy no Streamlit Cloud. Acesse: [Link do Deploy]

## Estrutura do Projeto

```
├── app.py                 # Aplicação principal Streamlit
├── backend/               # Classes do backend
│   ├── __init__.py
│   ├── character.py       # Classe Personagem
│   ├── race.py           # Classe Raça
│   ├── class_.py         # Classe Classe
│   ├── background.py     # Classe Antecedente
│   ├── item.py           # Classe Item
│   ├── ability.py        # Classe Habilidade
│   └── data/             # Dados das raças, classes, etc.
├── frontend/             # Componentes da interface
│   ├── __init__.py
│   ├── character_creator.py
│   ├── character_sheet.py
│   └── utils.py
└── requirements.txt      # Dependências
```

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## Licença

MIT License