import { useEffect, useState } from 'react'
import type { Movie } from '../../interfaces/movie';
import axios from '../../utility/axios';
import './Row.css'

interface RowProps {
    fetchURL: string
    title: string
    isLargeRow?: boolean
}
const Row = (props: RowProps) => {
    const [movies, setMovies] = useState([]);
    const IMAGE_URL = import.meta.env.VITE_IMAGE_URL

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(props?.fetchURL)
            setMovies(request?.data?.results)
            return request
        }
        fetchData()
    }, [])

    return (
        <div className='row'>
            <h2>{props?.title}</h2>
            <div className='row__posters'>
                {movies?.map((movie: Movie) => {
                    return (
                        <img key={movie?.id} src={`${IMAGE_URL}${props?.isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} alt={movie?.name} className={`row__poster ${props?.isLargeRow && "row__posterLarge"}`} />
                    )
                })}
            </div>
        </div>
    )
}

export default Row