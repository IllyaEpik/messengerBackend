
import { albumRepository } from "./album.repository.ts";
import type{ serviceContract } from "./album.types.ts";
import sharp from 'sharp';
import { join,dirname  } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = join(__dirname, "../../media/")

export const albumService: serviceContract = {
    async createAlbum(data, userId) {
        const album = await albumRepository.createAlbum(data,userId)
        return album
    },
    async getAlbums(userId) {
        const album = await albumRepository.getAlbums(userId)
        
        if (!album) return "profile does not exist "
        return album
    },
    async updateAlbum(data, albumId,image) {
        // let other;
        // if (data?.id){
        const {year,...other} = data
        const validatedData = {
            ...(other),
            ...(year && {year:Number(year)})
        }
        // }else{
        //     let other = data
        // }
        
        if (image){
            const timestamp = Date.now();
            const originalPath = join(outputDir, `/Avatars/${timestamp}.jpg`);
            const minimizedPath = join(outputDir, `/crackedAvatars/${timestamp}.jpg`);

            await sharp(image.buffer).toFile(originalPath);
            await sharp(image.buffer)
            .resize({ width: 100, withoutEnlargement: true }) 
            .jpeg({ quality: 80 })  
            .toFile(minimizedPath);
            await albumRepository.addPhoto({
                photo:originalPath,
                crackedPhoto:minimizedPath,
                visible:true
            },albumId)

        }
        const album = await albumRepository.updateAlbum(validatedData,albumId)
        
        return album
    },
    async deleteAlbum(id, userId) {
        
        const album = await albumRepository.deleteAlbum(id)
        
        return album
    }
}