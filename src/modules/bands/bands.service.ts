import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class BandsService {
  constructor(private readonly httpService: HttpService) {}

  async findByNames(names: string[]) {
    const bands = await Promise.all(names.map(async name => {
        const response = await this.httpService.axiosRef.get(`http://localhost:3003/v1/bands?name=${name}`)
        return response.data.items[0];
      }))

    return bands.filter(i => !!i)
  }

  async findOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3003/v1/bands/${id}`);
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
        'http://localhost:3003/v1/bands/',
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

  async createBand(band, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.post(
        'http://localhost:3003/v1/bands/',
        band,
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

  async updateBand(id, band, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.put(
        `http://localhost:3003/v1/bands/${id}`,
        band,
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

  async deleteBand(id, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.delete(
        `http://localhost:3003/v1/bands/${id}`,
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
