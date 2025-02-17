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
                    <p className="listing-location">{listing.location}</p>
                    <p className="listing-description">{listing.description}</p>
                    <p className="price">{listing.price}</p>
                    <div className="listing-rating">
                        {renderStars(listing.rating, listing.reviews)}
                    </div>
                    <button className="btn">Réserver maintenant</button>
                </div>
            </div>

            <div className="listing-amenities">
                <h2>Équipements</h2>
                <ul>
                    {listing.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))}
                </ul>
            </div>

            <div className="listing-reviews">
                <h2>Avis</h2>
                <p>{listing.reviews} avis</p>
                {/* Vous pouvez ajouter une section pour afficher les avis ici */}
            </div>
        </div>
    )
}

const renderStars = (rating, reviews) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
        <>
            {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
            {halfStar === 1 && <i className="fa-solid fa-star-half-stroke"></i>}
            {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="fa-regular fa-star"></i>)}
            <span className="rating-number"> {rating} ({reviews} avis)</span>
        </>
    );
};

export default Details;