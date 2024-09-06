import axios from 'axios';
import config from '../config/localhost.json'; // Импортируем конфиг

export interface Family {
  id?: number;
  family_name: string;
  text: string;
  presence: boolean;
  [key: string]: any; // Другие поля, которые могут быть у семьи
}

export class FamilyService {
  private static baseUrl: string = `https://${config.server.host}/api/family`; // Адрес вашего API
  private static token: string = config.server.token; // Ваш токен

  private static getHeaders() {
		return {
			headers: {
				Authorization: `${this.token}`
			}
		};
  }

  public static async getAllFamilies(): Promise<Family[]> {
		const response = await axios.get(`${this.baseUrl}/`, this.getHeaders());
		return response.data;
  }

  public static async getFamilyById(id: number): Promise<Family | null> {
		const response = await axios.get(`${this.baseUrl}/id/${id}`, this.getHeaders());
		return response.data;
  }

  public static async getFamilyByName(family_name: string): Promise<Family | null> {
		const response = await axios.get(`${this.baseUrl}/name/${family_name}`, this.getHeaders());
		return response.data;
  }

  public static async addFamily(familyData: Family): Promise<Family> {
		const response = await axios.post(`${this.baseUrl}/`, familyData, this.getHeaders());
		return response.data;
  }

  public static async deleteFamily(identifier: number | string): Promise<void> {
		let url = `${this.baseUrl}/`;
		if (typeof identifier === 'number') {
			url += `${identifier}`;
		} else {
			url += `name/${identifier}`;
		}
		await axios.delete(url, this.getHeaders());
  }

  public static async updateFamily(identifier: number | string, updatedData: Family): Promise<void> {
		let url = `${this.baseUrl}/`;
		if (typeof identifier === 'number') {
			url += `${identifier}`;
		} else {
			url += `name/${identifier}`;
		}
		await axios.put(url, updatedData, this.getHeaders());
  }
}

