import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PostsRequest { 
    @ApiProperty()  
    @IsNotEmpty()
    start: number;
    
    @ApiProperty()
    @IsNotEmpty()
    size: number;
}