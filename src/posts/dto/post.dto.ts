import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "./comments.dto";
import { Users } from "./users.dto";

export class Posts {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    user: Users

    @ApiProperty()
    comments: Comments[]
}
