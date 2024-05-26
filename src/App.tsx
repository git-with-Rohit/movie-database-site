import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/style.css';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2821eff1517b1cd92deed4b166ec08f&page=';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=d2821eff1517b1cd92deed4b166ec08f&query=';

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  return (
    <div>
      <div className="topnav">
        <a className="active" href="/">MovieFlix</a>
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
        <a href="/contact" className="contact-link">Contact Us</a>
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
    </div>
  );
};

export default App;
