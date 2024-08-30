import axios from 'axios';
import config from '../config/localhost.json'; // Импортируем конфиг

export interface Guest {
  id?: number;
  full_name: string;
  [key: string]: any; // Другие поля, которые могут быть у гостя
}

export class GuestService {
  private static baseUrl: string = `http://${config.server.host}:${config.server.PORT}/api/guests`; // Адрес вашего API
  private static token: string = config.server.token; // Ваш токен

  private static getHeaders() {
		return {
			headers: {
				Authorization: `${this.token}`
			}
		};
  }

  public static async getAllGuests(): Promise<Guest[]> {
		const response = await axios.get(`${this.baseUrl}/`, this.getHeaders());
		return response.data;
  }

  public static async getGuestById(id: number): Promise<Guest | null> {
		const response = await axios.get(`${this.baseUrl}/id/${id}`, this.getHeaders());
		return response.data;
  }

  public static async getGuestByName(full_name: string): Promise<Guest | null> {
		const response = await axios.get(`${this.baseUrl}/name/${full_name}`, this.getHeaders());
		return response.data;
  }

  public static async addGuest(guestData: Guest): Promise<Guest> {
		const response = await axios.post(`${this.baseUrl}/`, guestData, this.getHeaders());
		return response.data;
  }

  public static async deleteGuest(full_name: string): Promise<void> {
		await axios.delete(`${this.baseUrl}/${full_name}`, this.getHeaders());
  }

  public static async deleteGuestById(id: number): Promise<void> {
		await axios.delete(`${this.baseUrl}/id/${id}`, this.getHeaders());
  }

  public static async deleteGuestByIdGuest(id_guest: number): Promise<void> {
		await axios.delete(`${this.baseUrl}/id_guest/${id_guest}`, this.getHeaders());
  }

  public static async updateGuest(full_name: string, updatedData: Guest): Promise<void> {
			await axios.put(`${this.baseUrl}/${full_name}`, updatedData, this.getHeaders());
  }
}

