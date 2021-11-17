import {Router} from 'express'
import path from 'path'
import multer from 'multer'
import * as U from '../utils'
import {IJWTDecoded} from './IJWTDecoded'
import {getPublicDir} from '../config'

const upload = multer({dest: 'uploads/'})

export type UploadFileType = Express.Multer.File

export const uploadFilesRouter = (ip: string, port: number) => {
  const router = Router()
  return router.use(upload.any()).post('/', async (req, res) => {
    const {authorization} = req.headers || {}
    if (!authorization) {
      res.status(401).json({success: false, message: 'no jwt'})
      return
    }

    const jwt = authorization.split(' ')[1]
    if (!jwt || jwt.length < 1) {
      res.status(401).json({success: false, message: 'no jwt'})
      return
    }

    const decoded = await U.jwtVerify<IJWTDecoded>(jwt)
    const files = req.files

    const renamePromises = (files as UploadFileType[]).map((file) => {
      const {originalname, destination, path: filepath} = file

      return U.moveFile(
        filepath,
        path.join(getPublicDir(), U.makeRandomFileName(originalname))
      )
    })

    const result = await Promise.all(renamePromises)

    const uris = result.map((destpath) => ({
      uri: `http://${ip}:${port}/${destpath}`
    }))
    res.json({...decoded, ...uris[0]})
  })
}
