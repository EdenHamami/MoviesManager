import React, { useEffect, useState } from "react";
import { getMovies } from "./api/MoviesApi";
import "./HomePage.css";
import MoviesList from "./MoviesList";

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [relevantMovies, setRelevantMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      const moviesData = response.data;
      const categories = Array.from(new Set(moviesData.map((m) => m.category)));

      setCategories(categories);
      setMovies(moviesData);
      setRelevantMovies(moviesData); // Initial load
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies) {
      let filteredMovies = movies.filter(
        (movie) =>
          movie.name.toLowerCase().includes(searchInput.toLowerCase()) &&
          (selectedCategories.length === 0 ||
            selectedCategories.includes(movie.category))
      );

      const sorter = {
        name: (a, b) => a.name.localeCompare(b.name),
        year: (a, b) => a.yearOfRelease - b.yearOfRelease,
        duration: (a, b) => a.duration - b.duration,
      };

      filteredMovies.sort(sorter[sortBy]);

      setRelevantMovies(filteredMovies);
    }
  }, [movies, searchInput, sortBy, selectedCategories]);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="left-side">
        <div className="categories">
          {categories.map((category) => (
            <div
              key={category}
              className={`category ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-top">
          <input
            type="text"
            className="search-movie-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search movies..."
          />
          <select
            className="sort-by"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="name">Name</option>
            <option value="year">Year</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <div className="right-side-bottom">
          <MoviesList relevantMovies={relevantMovies} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
