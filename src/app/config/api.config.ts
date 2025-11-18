/**
 * Configuração centralizada da API
 * Altere aqui se precisar mudar a URL base do backend
 */
export const API_CONFIG = {
  baseUrl: 'http://localhost:8080/api',
  endpoints: {
    contas: '/contas',
    transferencias: '/transferencias',
    depositos: '/depositos',
    emprestimos: '/emprestimos'
  }
};

