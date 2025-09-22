import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="main-header mb-6">
          🏰 D&D 5e Character Creator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Crie e gerencie suas fichas de personagem para Dungeons & Dragons 5ª edição (2024)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create"
            className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
          >
            <Plus size={24} />
            <span>Criar Novo Personagem</span>
          </Link>
          <Link
            to="/sheet"
            className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
          >
            <FileText size={24} />
            <span>Ver Fichas Salvas</span>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="metric-card">
          <div className="metric-value">9</div>
          <div className="metric-label">Raças Disponíveis</div>
          <div className="text-sm opacity-75 mt-1">Todas as raças principais</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">12</div>
          <div className="metric-label">Classes Disponíveis</div>
          <div className="text-sm opacity-75 mt-1">Todas as classes principais</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">6</div>
          <div className="metric-label">Antecedentes</div>
          <div className="text-sm opacity-75 mt-1">Antecedentes clássicos</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">10+</div>
          <div className="metric-label">Funcionalidades</div>
          <div className="text-sm opacity-75 mt-1">Sistema completo</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="section-header text-center mb-8">🎯 Funcionalidades Principais</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              ✨ Criação de Personagens
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Seleção de raça, classe e antecedente</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Aplicação automática de regras e bônus</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Sistema de pontuação de habilidades flexível</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Equipamentos iniciais automáticos</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              📋 Gerenciamento de Fichas
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Visualização completa da ficha</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Salvamento e carregamento local</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Edição de personagens existentes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Sistema de notas personalizadas</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              🎲 Sistema de Habilidades
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Array padrão (15, 14, 13, 12, 10, 8)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Compra por pontos (27 pontos)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Rolagem de dados (4d6, descarte o menor)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Cálculo automático de modificadores</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              📄 Exportação e Compartilhamento
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Exportação para PDF</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Interface responsiva</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Modo escuro disponível</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Código aberto e extensível</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mb-12">
        <h2 className="section-header text-center mb-8">🚀 Como Usar</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Acesse a aba 'Criar Personagem' para começar um novo personagem",
              "Preencha as informações básicas (nome, nível, raça, classe, antecedente)",
              "Configure as habilidades usando um dos métodos disponíveis",
              "Adicione equipamentos e habilidades especiais conforme necessário",
              "Salve seu personagem para acessá-lo posteriormente",
              "Visualize a ficha completa na aba 'Ficha do Personagem'",
              "Exporte para PDF quando estiver satisfeito com o resultado"
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Info Section */}
      <div className="mb-12">
        <h2 className="section-header text-center mb-8">⚙️ Informações Técnicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Desenvolvido com:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>⚛️ React 18 + TypeScript</li>
              <li>⚡ Vite (Build Tool)</li>
              <li>🎨 Tailwind CSS</li>
              <li>📄 jsPDF (PDF Export)</li>
              <li>🌐 GitHub Pages</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Baseado em:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>📚 D&D 5e System Reference Document (SRD)</li>
              <li>📖 Player's Handbook 2024</li>
              <li>⚖️ Regras oficiais da Wizards of the Coast</li>
              <li>🌍 Licença: MIT License</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar sua aventura?</h2>
          <p className="text-lg mb-6 opacity-90">
            Crie seu primeiro personagem em poucos minutos e mergulhe no mundo de D&D!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <Plus size={24} />
            <span>Criar Personagem Agora</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;