import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import ContactModal from './components/ContactModal';

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2821eff1517b1cd92deed4b166ec08f&page=';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=d2821eff1517b1cd92deed4b166ec08f&query=';

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchMovies(APILINK + currentPage);
  }, [currentPage]);

  const fetchMovies = (url: string) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setCurrentPage(1);
      fetchMovies(SEARCHAPI + searchTerm);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <div>
      <div className="topnav">
        <Link to="/" className="active">MovieFlix</Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie..."
            />
          </form>
        </div>
        <button onClick={openContactModal} className="contact-link">Contact Us</button>
      </div>

      <div className="hero">
        <h1>Welcome to MovieFlix</h1>
        <p>Your ultimate movie database</p>
      </div>

      <section id="section">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      <hr />

      <Pagination totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />

      <ContactModal show={showContactModal} onClose={closeContactModal} />
    </div>
  );
};

export default App;
