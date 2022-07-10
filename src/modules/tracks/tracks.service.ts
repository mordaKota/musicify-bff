import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class TracksService {
  constructor(private readonly httpService: HttpService) {}

  async findOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3006/v1/tracks/${id}`);
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
        'http://localhost:3006/v1/tracks/',
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

  async createTrack(track, authToken) {
    let data;
    try {
      track.artistsIds = track.artists;
      track.bandsIds = track.bands;
      track.genresIds = track.genres;
      track.albumId = track.album;
      const response = await this.httpService.axiosRef.post(
        'http://localhost:3006/v1/tracks/',
        track,
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

  async updateTrack(id, track, authToken) {
    let data;
    try {
      track.artistsIds = track.artists;
      track.bandsIds = track.bands;
      track.genresIds = track.genres;
      track.albumId = track.album;
      const response = await this.httpService.axiosRef.put(
        `http://localhost:3006/v1/tracks/${id}`,
        track,
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

  async deleteTrack(id, authToken) {
    let data;
    try {
      const response = await this.httpService.axiosRef.delete(
        `http://localhost:3006/v1/tracks/${id}`,
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
