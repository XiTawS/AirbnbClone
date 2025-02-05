import { useLocation } from 'react-router-dom'
import './App.css'


function Details() {
    const {state} = useLocation()
    const listing = state?.listing

    if (!listing) {
        return <div>No listing found</div>
    }

    return (
        <div className="details-container">
            <header className="header">
                <nav className="nav">
                    <div className="logo">AirbnbClone</div>
                    <div className="nav-links">
                        <a href="listings.html">Locations</a>
                    </div>
                </nav>
            </header>
            <div className='listing-details'>
                <button onClick={() => window.history.back()} className='back-button'>Retour</button>
                <div className="listing-image-container">
                    <img src={listing.image} alt={listing.title} className='listing-image'/>
                </div>
                <div className='listing-detail-info'>
                    <h1 className="listing-title">{listing.title}</h1>
                    <p className="listing-description">{listing.description}</p>
                    <p className="price">{listing.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Details;