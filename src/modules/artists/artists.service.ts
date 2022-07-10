import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class ArtistsService {
  constructor(private readonly httpService: HttpService) {}

  async findOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3002/v1/artists/${id}`);
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
        'http://localhost:3002/v1/artists/',
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

  async createArtist(artist, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.post(
        'http://localhost:3002/v1/artists/',
        artist,
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

  async updateArtist(id, artist, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.put(
        `http://localhost:3002/v1/artists/${id}`,
        artist,
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

  async deleteArtist(id, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.delete(
        `http://localhost:3002/v1/artists/${id}`,
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
