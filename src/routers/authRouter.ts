import {Router} from 'express'

export const authRouter = () => {
  const router = Router()
  return router
    .get('/signUp', (req, res) => res.json({message: 'signUp called'}))
    .get('/login', (req, res) => res.json({message: 'login called'}))
}
