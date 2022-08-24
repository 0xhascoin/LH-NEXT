import 'bulma';
import '../styles/globals.scss';
import '../styles/hero.scss';
import '../styles/header.scss';
import '../styles/login.scss';
import '../styles/post.scss';
import '../styles/jobPreviewModal.scss';
import '../styles/postJobErrorModal.scss';
import '../styles/jobsList.scss';
import 'react-quill/dist/quill.snow.css';



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
