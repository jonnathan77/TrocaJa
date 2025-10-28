export interface Brand {
  name?: string;
  logo?: string;
  codigo?: string; // pode vir como 'codigo' da API
  nome?: string; // algumas respostas usam 'nome'
}

export interface Model {
  nome: string;
  codigo?: string;
}

export interface Ano {
  nome: string;
  codigo?: string;
}
