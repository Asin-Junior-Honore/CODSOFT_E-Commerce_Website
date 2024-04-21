import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProductDataProvider } from './contexts/ProductDataContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductDataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductDataProvider>
  </React.StrictMode>,

)
