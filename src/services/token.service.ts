import http from '../utils/http-common'
import store from '../store'

export class TokenService {
    private static readonly LOCAL_STORAGE_TOKEN = 'plauditAuthToken'
    private static readonly LOCAL_STORAGE_REFRESH = 'plauditRefreshToken'

    public static getNewToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            http.post('/auth/token', {
                refreshToken: localStorage.getItem('plauditRefreshToken'),
                username: store.state.currentUser
            })
            .then(response => {
                this.setAuthToken(response.data.authToken)
                resolve(response.data.authToken)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    public static setAuthToken(token: string): void {
        localStorage.setItem('plauditAuthToken', token)
    }

    public static setRefreshToken(refreshToken: string): void {
        localStorage.setItem('plauditRefreshToken', refreshToken)
    }

    public static getAuthToken(): string | null {
        return localStorage.getItem('plauditAuthToken')
    }

    public static getRefreshToken(): string | null {
        return localStorage.getItem('plauditRefreshToken')
    }

    public static clearTokens(): void {
        localStorage.removeItem('plauditRefreshToken')
        localStorage.removeItem('plauditAuthToken')
    }
}
