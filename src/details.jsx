import { useLocation } from 'react-router-dom'
import './App.css'


function Details() {
    const {state} = useLocation()
    const listing = state?.listing

    if (!listing) {
        return <div>No listing found</div>
    }

    return (
        <>
        <header class="header">
        <nav class="nav">
            <div class="logo">AirbnbClone</div>
            <div class="nav-links">
                <a href="listings.html">Locations</a>
            </div>
        </nav>
        </header>
        <div className='listing-details'>
            <img src={listing.image} alt={listing.title} className='listing-image'/>
            <div className='listing-detail-info'>
                <h1>{listing.title}</h1>
                <p>{listing.description}</p>
                <p className="price">{listing.price}</p>
            </div>
        </div>
        </>
    )
}

export default Details;