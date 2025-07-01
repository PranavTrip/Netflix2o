import { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../utility/axios';
import requests from '../../utility/requests';
import type { Movie } from '../../interfaces/movie';


const Banner = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const IMAGE_URL = import.meta.env.VITE_IMAGE_URL
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
            return request
        }
        fetchData()
    }, [])
    const truncate = (str: string, n: number) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str
    }
    return (
        <div className="banner">
            <header style={{
                backgroundImage: `url("${IMAGE_URL}${movie?.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: '100%'
            }}>
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button">Play</button>
                        <button className="banner__button">My List</button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(movie?.overview || '', 150)}
                    </h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
        </div>
    )
}

export default Banner