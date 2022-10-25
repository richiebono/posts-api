import { ApiProperty } from "@nestjs/swagger";

export class Users {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    };

    @ApiProperty()
    phone: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}