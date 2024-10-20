import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AboutPage from './pages/About.tsx'
import TermsPage from './pages/Terms.tsx'
import ErrorSection from './pages/ErrorPage.tsx'
import DownloadPage from './pages/Download.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from "react-query";
import { queryClient } from './utils/queryClient.ts'
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
},
{
  path: '/download/:id',
  element: <DownloadPage/>
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
