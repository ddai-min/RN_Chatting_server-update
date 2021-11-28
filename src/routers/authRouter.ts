import {Router} from 'express'
import {IJWTDecoded} from './IJWTDecoded'
import * as U from '../utils'

export const authRouter = () => {
  const router = Router()
  return router
    .post('/signup', async (req, res) => {
      const {name, email, password} = req.body
      console.log(
        'signup',
        'name:',
        name,
        'email:',
        email,
        'password:',
        password
      )
      const jwt = await U.jwtSign(
        {email, name, password, provider: 'local'},
        {expiresIn: '9999 years'}
      )
      res.json({jwt})
    })
    .post('/login', async (req, res) => {
      const {authorization} = req.headers || {}
      if (!authorization) {
        res.json({success: false, message: 'no jwt'})
        return
      }

      const {email, password} = req.body
      const jwt = authorization.split(' ')[1]
      if (!jwt || jwt.length < 0) {
        res.json({success: false, message: 'no jwt'})
        return
      }
      try {
        const decoded = await U.jwtVerify<IJWTDecoded>(jwt)
        console.log('login', 'email:', email, 'decoded email:', decoded.email)
        console.log(
          'login',
          'password:',
          password,
          'decoded password:',
          decoded.password
        )
        if (email !== decoded.email) {
          res.json({
            success: false,
            message: `일치하는 회원정보가 없습니다.`
          })
        }
        if (password !== decoded.password) {
          res.json({
            success: false,
            message: `패스워드가 일치하지 않습니다.`
          })
        } else
          res.json({
            success: true,
            provider: decoded.provider,
            name: decoded.name,
            message: `환영합니다. ${decoded.name}님.`
          })
      } catch (e: unknown) {
        if (e instanceof Error) {
          return res.json({success: false, message: e.message})
        }
      }
    })
}
