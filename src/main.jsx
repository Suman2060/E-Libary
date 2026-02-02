
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ShelfProvider } from './context/ShelfContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShelfProvider>
    <App/>
  </ShelfProvider>
  
  </BrowserRouter>

)
