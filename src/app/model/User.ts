import JwtToken from './JwtToken';

export default class User {
    userId: number
    brpId: number
    username: string
    roles: string[]
    jwt: JwtToken
}