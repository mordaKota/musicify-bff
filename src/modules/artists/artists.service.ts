import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsService {
  async findOneById(id: string) {
    return {
      id: 'string',
      firstName: 'TestName',
      secondName: 'TestSurname',
      middleName: 'TestMiddle',
      birthDate: null,
      birthPlace: null,
      country: 'Russia',
      bands: [],
      instruments: [],
    }
  }
}
