export type IJWTDecoded = {
  provider: string
  name: string
  email: string
  password: string
  category: {
    one: boolean
    two: boolean
    three: boolean
  }
}
