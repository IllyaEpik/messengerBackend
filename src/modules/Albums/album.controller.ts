
import { albumService } from "./album.service.ts";
import type{ controllerContract } from "./album.types.ts";



export const albumController: controllerContract = {
    async createAlbum(req, res, next) {
        const year = Number(req.body.year)
        const data = {
            year,
            title:req.body.title,
            topic:req.body.topic
        }
        const userId = res.locals.userId
        const album = await albumService.createAlbum(data,userId) 
        res.locals.succsesStatus = 201
        res.locals.data = album
        next()
    },
    async getAlbums(req, res, next) {
        const userId = res.locals.userId
        const album = await albumService.getAlbums(userId) 
        res.locals.succsesStatus = 201
        res.locals.data = album
        next()
    },
    async updateAlbum(req, res, next) {
        const data = req.body
        const userId = res.locals.userId
        const id = Number(req.params.id)
        const imageFile = req.file
        if (isNaN(id)){
            res.status(400).json("id is wrong")
        }
        const album = await albumService.updateAlbum(data,id,imageFile)
        res.locals.data = album
        next()
    },
    async deleteAlbum(req, res, next) {
        const userId = res.locals.userId
        const id = Number(req.params.id)
        if (isNaN(id)){
            res.status(400).json("id is wrong")
        }
        
        const album = await albumService.deleteAlbum(id,userId)
        res.locals.data = album
        next()
    },
}