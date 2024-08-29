import { UploadApiResponse, v2 } from "cloudinary";
import { Injectable, NotFoundException, ParseUUIDPipe, Put } from "@nestjs/common";
import { FilesRepository } from "./file-upload.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
    constructor(private readonly FilesRepository: FilesRepository,
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string){
        const product = await this.ProductRepository.findOneBy( { product_id: productId } )
        if(!product) throw new NotFoundException('Product not found')
        
        const UploadedFile = await this.FilesRepository.uploadImage(file)

        await this.ProductRepository.update(productId, { imgUrl: UploadedFile.secure_url })

        return await this.ProductRepository.findOneBy( { product_id: productId } )

 }
}