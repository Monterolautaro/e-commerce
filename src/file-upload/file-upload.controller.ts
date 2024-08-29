import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/authguard.guard';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('id') productId: string, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 1000000,
                message: 'file is too heavy'
            }),
            new FileTypeValidator({ fileType: /jpg|jpeg|png|gif|webp|svg/ }),
        ]
    })) file: Express.Multer.File) {
        return await this.filesService.uploadImage(file, productId)
    }
}
