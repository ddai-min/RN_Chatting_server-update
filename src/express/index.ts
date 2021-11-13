import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

export const createExpressServer = () => {
  const app = express()
  return app.use(express.static('public')).use(cors()).use(bodyParser.json())
}
