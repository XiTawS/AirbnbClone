import './App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const listings = [
    {
      id: 1,
      title: "Appartement moderne à Paris",
      location: "Paris",
      description: "Un appartement moderne à Paris",
      rating: "5",
      reviews: "1400",
      beds: "2",
      wifi: "yes",
      price: "120€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
      ],
    },
    {
      id: 2,
      title: "Villa avec piscine à Nice",
      location: "Nice",
      description: "Une villa avec piscine à Nice",
      rating: "4.5",
      reviews: "170",
      beds: "2",
      wifi: "yes",
      price: "250€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
      ],
    },
    {
      id: 3,
      title: "Chalet en montagne",
      location: "Chamonix",
      description: "Un chalet en montagne",
      rating: "3.5",
      reviews: "178",
      beds: "2",
      wifi: "no",
      price: "180€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e"
      ],
    },
    {
      id: 4,
      title: "Chalet en montagne",
      location: "Chamonix",
      description: "Un chalet en montagne",
      rating: "3.5",
      reviews: "178",
      beds: "2",
      wifi: "no",
      price: "180€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e"
      ],
    },
    {
      id: 5,
      title: "Chalet en montagne",
      location: "Chamonix",
      description: "Un chalet en montagne",
      rating: "3.5",
      reviews: "178",
      beds: "2",
      wifi: "no",
      price: "180€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e"
      ],
    },
    {
      id: 6,
      title: "Chalet en montagne",
      location: "Chamonix",
      description: "Un chalet en montagne",
      rating: "3.5",
      reviews: "178",
      beds: "2",
      wifi: "no",
      price: "180€ / nuit",
      images: [
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e"
      ],
    },
  ];

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

  const handleImageLoad = (index) => {
    const imageElements = document.querySelectorAll('.listing-image');
    if (imageElements[index]) {
      imageElements[index].classList.add('loaded');
    }
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
    <>
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
          <input className="search-location" type="text" placeholder="Où allez-vous ?" />
        </div>
        <button className="search-button">Rechercher</button>
      </div>
      <main className="listings-container">
        {listings.map((listing, index) => (
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
      </main>
    </>
  );
}

export default App
