import { ApiProperty } from "@nestjs/swagger";

export class Comments {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    postId: number; 

    @ApiProperty()   
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    body: string
}