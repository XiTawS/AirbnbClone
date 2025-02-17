import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <main class="checkout-container">
        <div class="checkout-form">
            <h1>Finaliser votre réservation</h1>
            <hr/>
            <form>
                <div class="form-group">
                    <label>Nom complet</label>
                    <input type="text" required/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required/>
                </div>
                <div class="form-group">
                    <label>Téléphone</label>
                    <input type="tel" required/>
                </div>
                <div class="form-group">
                    <label>Numéro de carte</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required/>
                </div>
                <div class="form-group">
                    <label>Date d'expiration</label>
                    <input type="text" placeholder="MM/AA" required/>
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" required/>
                </div>
                <button type="submit" class="btn">Confirmer la réservation</button>
            </form>
        </div>
    </main>
    </>
  )
}

export default App;