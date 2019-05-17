import JwtToken from './JwtToken';

export default class User {
    id: number
    brpId: number
    username: string
    roles: string[]
    jwt: JwtToken
}