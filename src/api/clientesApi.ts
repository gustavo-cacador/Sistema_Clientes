import axios from 'axios';
import { Cliente } from '../types/index';

const BASE_URL = 'http://localhost:5173/clientes'; 

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
