export interface Token {
    accessToken: string
    refreshToken: string
}

export enum TokenType {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token"
}