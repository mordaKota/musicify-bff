import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class GenresService {
  constructor(private readonly httpService: HttpService) {}
  async findOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3001/v1/genres/${id}`);
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

  async getAll(limit: number, offset: number) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(
        'http://localhost:3001/v1/genres',
        { params: { limit: limit, offset: offset }}
      )
      data = response.data;
      data.items.forEach(item => item.id = item._id);
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data.items;
  }

  async createGenre(genre, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.post(
        'http://localhost:3001/v1/genres',
        genre,
        { headers: { 'Authorization': authToken } }
      );
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

  async updateGenre(id, genre, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.put(
        `http://localhost:3001/v1/genres/${id}`,
        genre,
        { headers: { 'Authorization': authToken } }
      );
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

  async deleteGenre(id, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.delete(
        `http://localhost:3001/v1/genres/${id}`,
        { headers: { 'Authorization': authToken } }
      );
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

}
