import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

import { AppRouter } from '@app/router/AppRouter'

import { ErrorBoundary } from '@shared/components/ErrorBoundary/ErrorBoundary'

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<AppRouter />
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					toastClassName="app-toast"
					bodyClassName="app-toast__body"
					transition={Slide}
				/>
			</BrowserRouter>
		</ErrorBoundary>
	)
}

export { App }
