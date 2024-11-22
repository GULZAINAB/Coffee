import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class   CreateCoffeDto {
    // @ApiProperty({description:"the name of coffee"})
    @IsString()
    readonly name : string;

    // @ApiProperty({description:"the brand of coffee"})
    @IsString()
     readonly brand : string;
     @IsString()//({each: true})
    readonly flavours : string[];
}
  