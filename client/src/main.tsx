import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AboutPage from './pages/About.tsx'
import TermsPage from './pages/Terms.tsx'
import ErrorSection from './pages/ErrorPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  errorElement: <ErrorSection/>
},
{
  path: '/about',
  element: <AboutPage/>
},
{
  path: '/terms',
  element: <TermsPage/>
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
