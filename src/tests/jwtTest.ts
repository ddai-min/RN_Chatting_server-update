import {jwtSign, jwtVerify} from '../utils'

jwtTest()

function jwtTest() {
  jwtSign({name: 'Jack', password: '1234'}, {expiresIn: '1d'})
    .then((signingKey: string) => {
      console.log('signingKey: ', signingKey)
      jwtVerify(signingKey)
        .then((decoded: object) => console.log('decoded: ', decoded))
        .catch((err) => console.log('error: ', err.message))
    })
    .catch((err: Error) => console.log('error: ', err.message))
}
