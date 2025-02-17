import './App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import listingsData from './listing.json';

function App() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);
  const [seniors, setSeniors] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [imageIndices, setImageIndices] = useState([0, 0, 0]);
  const [likedListings, setLikedListings] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings(listingsData);
  }, []);

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (listing) => {
    navigate('/details', {state: {listing}})
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

  const toggleTravelerPopup = () => {
    setShowTravelerPopup(!showTravelerPopup);
  };

  const handleNextImage = (index) => {
    setImageIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] + 1) % listings[index].images.length;
      return newIndices;
    });
  };

  const handlePrevImage = (index) => {
    setImageIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] - 1 + listings[index].images.length) % listings[index].images.length;
      return newIndices;
    });
  };

  const toggleLike = (listingId) => {
    setLikedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId) 
        : [...prev, listingId]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTravelerPopup && !event.target.closest('.traveler-popup') && !event.target.closest('.search-voyageurs')) {
        setShowTravelerPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTravelerPopup]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 75);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="logo">AirbnbClone</div>
          <div className="nav-links">
            <a href="listings.html">Locations</a>
          </div>
        </nav>
      </header>

      <div className={`search-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className='search-info'>
          <div className="search-section">
            <label>Arrivée</label>
            <DatePicker
              className="search-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Ajouter des dates d'arrivée"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="search-section">
            <label>Départ</label>
            <DatePicker
              className="search-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Ajouter des dates de départ"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="search-section">
            <label>Voyageurs</label>
            <input 
              className="search-voyageurs" 
              type="text" 
              value={`${seniors + adults + children} voyageurs`} 
              onClick={toggleTravelerPopup} 
              readOnly
            />
            {showTravelerPopup && (
              <div className="traveler-popup">
                <div>
                  <label>Seniors</label>
                  <div className="traveler-controls">
                    <button onClick={() => setSeniors(Math.max(0, seniors - 1))}>-</button>
                    <span>{seniors}</span>
                    <button onClick={() => setSeniors(seniors + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <label>Adultes</label>
                  <div className="traveler-controls">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => setAdults(adults + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <label>Enfants</label>
                  <div className="traveler-controls">
                    <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                    <span>{children}</span>
                    <button onClick={() => setChildren(children + 1)}>+</button>
                  </div>
                </div>
                <button className="btn-validate" onClick={toggleTravelerPopup}>Valider</button>
              </div>
            )}
          </div>
        </div>
        <div className="search-section">
          <label>Lieu</label>
          <input 
            className="search-location" 
            type="text" 
            placeholder="Où allez-vous ?" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <button className="search-button">Rechercher</button>
      </div>
      <main className="listings-container">
        <div>
          {filteredListings.map((listing, index) => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image-container">
                <img 
                  src={listing.images[imageIndices[index]]} 
                  alt={listing.title} 
                  className="listing-image" 
                />
                <div className="carousel-indicators">
                  {listing.images.map((_, imgIndex) => (
                    <span 
                      key={imgIndex} 
                      className={`indicator ${imageIndices[index] === imgIndex ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
                <button onClick={() => handlePrevImage(index)} className="carousel-button prev">&#10094;</button>
                <button onClick={() => handleNextImage(index)} className="carousel-button next">&#10095;</button>
              </div>
              <div className="listing-info">
                <h2 className="listing-title">{listing.title}</h2>
                <div className="listing-like">
                  <button 
                    onClick={() => toggleLike(listing.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <i className={`fa-heart ${likedListings.includes(listing.id) ? 'fa-solid' : 'fa-regular'}`}></i>
                  </button>
                </div>
                <p className="listing-description">{listing.description}</p>
                <p className="listing-rating"> {renderStars(listing.rating, listing.reviews)}</p>
                <p className="listing-details"><i className="fa-solid fa-location-dot"></i>{listing.location} <i className="fa-solid fa-bed"></i>{listing.beds} {listing.wifi === "yes" && <><i className="fa-solid fa-wifi"></i> Wi-Fi</>}</p>
                <p className="listing-price">{listing.price}</p>
                <button 
                  onClick={() => handleViewDetails(listing)} 
                  className="btn"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div>
            Votre recherche n'aboutie à aucun résultat 
          </div>
        )}
      </main>
    </div>
  );
}

export default App
