// user.services.tsx
import axios from 'axios';
import config from '../config/localhost.json';

const API_URL = `http://${config.server.host}:${config.server.PORT}/api`;  // Замените на ваш URL

interface User {
  id: number;
  status: 'admin' | 'user';
  login: string;
  password: string;
}

export class UserService{
	private static baseUrl: string = `http://${config.server.host}:${config.server.PORT}/api/users`; // Адрес вашего API
  private static token: string = config.server.token; // Ваш токен

  private static getHeaders() {
		return {
			headers: {
				Authorization: `${this.token}`
			}
		};
  }

	public static async getAllUsers(): Promise<User[]>{
		const response = await axios.get(`${this.baseUrl}/`, this.getHeaders());
  	return response.data;
	} 

	public static async getUserById(id: number): Promise<User>{
		const response = await axios.get(`${this.baseUrl}/id/${id}`, this.getHeaders());
  	return response.data;
	}

	public static async getUserByLogin(login: string): Promise<User>{
		const response = await axios.get(`${this.baseUrl}/login/${login}`, this.getHeaders());
  	return response.data;
	}

	public static async addUser(userData: Omit<User, 'id'>): Promise<User>{
		const response = await axios.post(`${this.baseUrl}/`, this.getHeaders());
  	return response.data;
	}

	public static async deleteUserByLogin(login: string): Promise<User>{
		const response = await axios.delete(`${this.baseUrl}/login/${login}`, this.getHeaders());
  	return response.data;
	} 

	public static async deleteUserById(id: number): Promise<User>{
		const response = await axios.delete(`${this.baseUrl}/id/${id}`, this.getHeaders());
  	return response.data;
	}

	public static async updateUserById(id: number, updatedData: Partial<User>): Promise<User>{
		const response = await axios.put(`${this.baseUrl}/id/${id}`, this.getHeaders());
  	return response.data;
	}

	public static async updateUserByLogin(login: string, updatedData: Partial<User>): Promise<User>{
		const response = await axios.put(`${this.baseUrl}/login/${login}`, this.getHeaders());
  	return response.data;
	}

};


export {User}
