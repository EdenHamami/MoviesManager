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

        setCategories(categories)
        setMovies(moviesData)

    }
    useEffect(() => {
        fetchMovies();
      },[]);
    if(!movies){
        return(<div>loading...</div>)
    }
    const handleSelectCategory=(category)=>{

        if (selectedCategories.includes(category)){
            setSelectedCategories(prev=>prev.filter(c=>c!=category))
        }
        else{
            setSelectedCategories(prev=>[...prev,category])
        }
    }
  return (
    <div className='home-page'>
        <div className='left-side'> 
            <div className='categories'>
                {categories.map(category=>(
                    <div 
                    className={`category ${'selected'?selectedCategories.includes(category):''}`}
                    onClick={()=>handleSelectCategory(category)}
                    >
                    {category}
                    </div>
                ))}
            </div>
        </div>
        <div className='right-side'> 

        </div>
    </div>
  )
}

export default HomePage