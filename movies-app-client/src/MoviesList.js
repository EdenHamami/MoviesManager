import React from 'react'
import MovieCard from './MovieCard'
import "./moviesList.css"
function MoviesList({relevatMovies}) {
  return (
    <div className='moviesList'>
        {relevatMovies.map(movie=>(
            <MovieCard key={movie.id} movie={movie}/>
        ))}
    </div>
  )
}

export default MoviesList