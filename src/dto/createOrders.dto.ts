import { PartialType } from "@nestjs/mapped-types"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "src/entities/products.entity"

export class ProductDto extends PartialType(Product) {}
export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    @IsNotEmpty()
    products: ProductDto[];
}