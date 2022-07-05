import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  async findOneById(id: number) {
    return {
      'firstName': 123
    }
  }
}
