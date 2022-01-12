import { createAuthProvider } from 'react-token-auth'

type Session = { access_token: string; refreshToken: string }

export const { useAuth, authFetch, login, logout } =
  createAuthProvider<Session>({
    getAccessToken: session => session.access_token,
    storage: localStorage,
    // onUpdateToken: token =>
    //   fetch('/update-token', {
    //     method: 'POST',
    //     body: token.refreshToken,
    //   }).then(r => r.json()),
  })
