import http from '../utils/http-common'
import store from '../store'

export default (refreshToken: string, username: string) => {
    refreshToken = localStorage.getItem('plauditRefreshToken') || '' as string
    username = store.state.currentUser as string
    http.post('/auth/token', {
        refreshToken,
        username
    })
        .then(results => {
            localStorage.removeItem('plauditAuthToken')
            localStorage.setItem('plauditAuthToken', results.data.authToken)
            console.log('new auth token test worked')
        })
        .catch(error => console.error(error))
}
