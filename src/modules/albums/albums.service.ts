import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class AlbumsService {
  constructor(private readonly httpService: HttpService) {}

  async findOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3005/v1/albums/${id}`);
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
        'http://localhost:3005/v1/albums/',
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

  async createAlbum(album, authToken) {
    let data;
    try {
      album.genresIds = album.genres;
      album.artistsIds = album.artists;
      album.tracksIds = album.tracks;
      album.bandsIds = album.bands;
      const response = await this.httpService.axiosRef.post(
        'http://localhost:3005/v1/albums/',
        album,
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

  async updateAlbum(id, album, authToken) {
    let data;
    try {
      album.genresIds = album.genres;
      album.artistsIds = album.artists;
      album.tracksIds = album.tracks;
      album.bandsIds = album.bands;
      const response = await this.httpService.axiosRef.put(
        `http://localhost:3005/v1/albums/${id}`,
        album,
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

  async deleteAlbum(id, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.delete(
        `http://localhost:3005/v1/albums/${id}`,
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
