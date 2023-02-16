import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Credentials, UserInput} from "../../graphql";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async register(user: UserInput) {
    let data;
    try {
      const response = await this.httpService.axiosRef.post('http://localhost:3004/v1/users/register', user);
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

  async getOneById(id: string) {
    let data;
    try {
      const response = await this.httpService.axiosRef.get(`http://localhost:3004/v1/users/${id}`);
      data = response.data;
      data.id = data._id;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }

  async getJwtToken(creds: Credentials) {
    let data;
    try {
      const response = await this.httpService.axiosRef.post('http://localhost:3004/v1/users/login', creds);
      data = response.data;
    } catch (e) {
      console.error({ e })
      throw e;
    }
    return data;
  }
}
