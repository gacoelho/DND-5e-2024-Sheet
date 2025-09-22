"""
Sistema de gerenciamento de usuários
"""

import json
import os
import hashlib
from typing import Dict, Any, Optional, List
from datetime import datetime


class User:
    """
    Classe para representar um usuário
    """
    
    def __init__(self, username: str, email: str = "", created_at: str = None):
        """
        Inicializa um usuário
        
        Args:
            username: Nome de usuário
            email: Email do usuário
            created_at: Data de criação
        """
        self.username = username
        self.email = email
        self.created_at = created_at or datetime.now().isoformat()
        self.last_login = None
        self.characters = []  # Lista de IDs dos personagens do usuário
    
    def to_dict(self) -> Dict[str, Any]:
        """Converte o usuário para dicionário"""
        return {
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'last_login': self.last_login,
            'characters': self.characters
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'User':
        """Cria um usuário a partir de dicionário"""
        user = cls(
            username=data['username'],
            email=data.get('email', ''),
            created_at=data.get('created_at')
        )
        user.last_login = data.get('last_login')
        user.characters = data.get('characters', [])
        return user


class UserManager:
    """
    Classe para gerenciar usuários
    """
    
    def __init__(self, users_dir: str = "users"):
        """
        Inicializa o gerenciador de usuários
        
        Args:
            users_dir: Diretório onde salvar os dados dos usuários
        """
        self.users_dir = users_dir
        if not os.path.exists(users_dir):
            os.makedirs(users_dir)
        
        self.users_file = os.path.join(users_dir, "users.json")
        self.users = self._load_users()
    
    def _load_users(self) -> Dict[str, User]:
        """Carrega usuários do arquivo"""
        if os.path.exists(self.users_file):
            try:
                with open(self.users_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                return {username: User.from_dict(user_data) for username, user_data in data.items()}
            except Exception as e:
                print(f"Erro ao carregar usuários: {e}")
                return {}
        return {}
    
    def _save_users(self):
        """Salva usuários no arquivo"""
        try:
            data = {username: user.to_dict() for username, user in self.users.items()}
            with open(self.users_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Erro ao salvar usuários: {e}")
    
    def register_user(self, username: str, password: str, email: str = "") -> bool:
        """
        Registra um novo usuário
        
        Args:
            username: Nome de usuário
            password: Senha
            email: Email do usuário
            
        Returns:
            True se registrado com sucesso, False caso contrário
        """
        if username in self.users:
            return False
        
        # Hash da senha (simples, para demonstração)
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        user = User(username, email)
        self.users[username] = user
        
        # Salva a senha (em produção, use bcrypt ou similar)
        self._save_password(username, password_hash)
        self._save_users()
        
        return True
    
    def authenticate_user(self, username: str, password: str) -> bool:
        """
        Autentica um usuário
        
        Args:
            username: Nome de usuário
            password: Senha
            
        Returns:
            True se autenticado com sucesso, False caso contrário
        """
        if username not in self.users:
            return False
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        stored_hash = self._get_password_hash(username)
        
        if stored_hash and password_hash == stored_hash:
            # Atualiza último login
            self.users[username].last_login = datetime.now().isoformat()
            self._save_users()
            return True
        
        return False
    
    def get_user(self, username: str) -> Optional[User]:
        """Obtém um usuário pelo nome"""
        return self.users.get(username)
    
    def _save_password(self, username: str, password_hash: str):
        """Salva hash da senha"""
        password_file = os.path.join(self.users_dir, f"{username}.pwd")
        with open(password_file, 'w') as f:
            f.write(password_hash)
    
    def _get_password_hash(self, username: str) -> Optional[str]:
        """Obtém hash da senha"""
        password_file = os.path.join(self.users_dir, f"{username}.pwd")
        if os.path.exists(password_file):
            with open(password_file, 'r') as f:
                return f.read().strip()
        return None
    
    def add_character_to_user(self, username: str, character_id: str):
        """Adiciona um personagem a um usuário"""
        if username in self.users:
            if character_id not in self.users[username].characters:
                self.users[username].characters.append(character_id)
                self._save_users()
    
    def remove_character_from_user(self, username: str, character_id: str):
        """Remove um personagem de um usuário"""
        if username in self.users:
            if character_id in self.users[username].characters:
                self.users[username].characters.remove(character_id)
                self._save_users()
    
    def get_user_characters(self, username: str) -> List[str]:
        """Obtém lista de personagens de um usuário"""
        if username in self.users:
            return self.users[username].characters
        return []
    
    def list_users(self) -> List[Dict[str, Any]]:
        """Lista todos os usuários"""
        return [
            {
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at,
                'last_login': user.last_login,
                'character_count': len(user.characters)
            }
            for user in self.users.values()
        ]