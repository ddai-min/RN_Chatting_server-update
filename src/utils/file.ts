import {promisify} from 'util'
import fs from 'fs'
import path from 'path'

export const mkdir = promisify(fs.mkdir)
export const stat = promisify(fs.stat)

export const unlink = promisify(fs.unlink)
export const deleteFile = unlink
export const rename = promisify(fs.rename)

const filenameOnly = (filepath: string) => filepath.split('/').reverse()[0]
export const moveFile = (srcpath: string, destpath: string) =>
  new Promise<string>((resolve, reject) => {
    rename(srcpath, destpath)
      .then(() => resolve(filenameOnly(destpath)))
      .catch(reject)
  })
export const makeRandomFileName = (filename: string) => {
  const ext = path.extname(filename)
  return `${Math.round(Math.random() * 10000000)}${ext}`
}
