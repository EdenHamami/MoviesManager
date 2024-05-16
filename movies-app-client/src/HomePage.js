import React, { useEffect, useState } from 'react'
import { getMovies } from './api/MoviesApi';
function HomePage() {
    const [movies,setMovies]=useState(null)
    const[relevatMovies,setRelevantMoviea]=useState(null);
    const [categories,setCategories]=useState([]);
    const [selectedCategories,setSelectedCategories]=useState([]);
    const [sortBy,setSortBy]=useState('name');
    const [searchInput,setSearchInput]=useState('')

    const fetchMovies=async ()=>{
        const response=await getMovies();
        const moviesData=response.data;
        const categories=Array.from(new Set(moviesData.map(m=>m.category)))
        console.log(moviesData);
        console.log(categories);
        setCategories(categories)
        setMovies(moviesData)

    }
    useEffect(() => {
        fetchMovies();
      },[]);
    
  return (
    <div className='home-page'>
        

    </div>
  )
}

export default HomePage