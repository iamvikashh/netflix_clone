import React, { useEffect,useState } from 'react';
import './Home.scss';
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const url="https://api.themoviedb.org/3";
const apiKey = "35cb6d7f13700c35f4f762a4b8b5aede";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card=({img})=>{
  return <img src={img} alt="cover" className='card' />
}

const Row=({title,arr=[]})=>{
  return <div className='row'>
    <h2>{title}</h2>
   <div>
    {
      arr.map((item,index)=>{
        console.log(`${imgUrl}/${item.poster_path}`);
         return  <Card key={index}img={`${imgUrl}/${item.poster_path}`}/>
      })
    }

   </div>
  </div>
}
const Home = () => {
  const [upcomingMovies,setUpcoming]=useState([]);
  const [popularMovies,setPopular]=useState([]);
  const [nowPlayingMovies,setNowPlaying]=useState([]);
  const [genre, setGenre] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  useEffect(() => {
    const fetchUpcoming=async ()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcoming(results);
    }
   
   const fetchpopular=async()=>{
    const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
    setPopular(results);
   }
   const fetchNowPlaying=async()=>{
    const {data:{results}}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
    setNowPlaying(results);
   }
   const getAllGenre = async () => {
    const {
        data: { genres },
    } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
    setGenre(genres);
    console.log(genres);
};
const fetchTopRated = async () => {
  const {
      data: { results },
  } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
  setTopRatedMovies(results);
};

   getAllGenre();
   fetchUpcoming();
   fetchpopular();
   fetchNowPlaying();
   fetchTopRated();
  }, [])
  
  return (
    <section className='home'>
          <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>
        <Row title={"Now Playing"} arr={nowPlayingMovies}/>
        <Row title={"Top Rated"} arr={topRatedMovies}/>
        <Row title={"Popular Movies"} arr={popularMovies}/>
        <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
        <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
    </section>
  )
}

export default Home