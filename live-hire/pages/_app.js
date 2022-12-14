import 'bulma';
import '../styles/globals.scss';
import '../styles/hero.scss';
import '../styles/header.scss';
import '../styles/login.scss';
import '../styles/post.scss';
import '../styles/jobPreviewModal.scss';
import '../styles/postJobErrorModal.scss';
import '../styles/jobsList.scss';
import '../styles/viewJob.scss';
import '../styles/pageBanner.scss';
import '../styles/search.scss';
import '../styles/account.scss';
import '../styles/workExperience.scss';
import '../styles/accountErrorModal.scss';
import '../styles/smallLoader.scss';
import '../styles/manager.scss';
import '../styles/application.scss';
import '../styles/viewApplicationModal.scss';
import '../styles/lobbyJob.scss';
import '../styles/lobbyQueue.scss';
import '../styles/jobs.scss';
import '../styles/filters.scss';
import '../styles/searchBar.scss';
import '../styles/searchResult.scss';
import '../styles/jobsGrid.scss';
import '../styles/job.scss';
import '../styles/modals.scss';
import '../styles/loader.scss';
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
