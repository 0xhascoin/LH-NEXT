import 'bulma';
import '../styles/globals.css';
import '../styles/header.scss';
import '../styles/login.scss';
import '../styles/post.scss';


import AuthStateChanged from '../auth/AuthStateChanged'
import { AuthProvider } from '../hook/auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default MyApp
