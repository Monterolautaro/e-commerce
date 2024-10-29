import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "src/entities/products.entity"

// export class ProductDto extends PartialType(Product) {}
export class CreateOrderDto {
    @ApiProperty({
        example: 'user_id'
    })
    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @ApiProperty({
        example: [
            { "id": "01c45b84-2838-406c-b432-f23de7140ddd"},
            { "id": "046dc3ce-da5c-4b68-b8f0-278880543bba"}
          ]
    })
    @ArrayMinSize(1)
    // @ValidateNested({ each: true })
    // @Type(() => ProductDto)
    @IsNotEmpty()
    products: Partial<Product>[];
}