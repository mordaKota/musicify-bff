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
}
