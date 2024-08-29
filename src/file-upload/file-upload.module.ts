import { Module } from '@nestjs/common';
import { FilesController } from './file-upload.controller';
import { FilesRepository } from './file-upload.repository';
import { FilesService } from './file-upload.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FilesController],
    providers: [FilesRepository, FilesService, cloudinaryConfig],
    exports: []
})
export class FilesModule {}
