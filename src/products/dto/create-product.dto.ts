import { IsNumber, IsString, IsUUID, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(2)
    name: string

    @IsString()
    @MinLength(2)
    sku: string

    @IsNumber({maxDecimalPlaces:2})
    @Min(0)
    price: number

    @IsUUID()
    categoryId: string

}
