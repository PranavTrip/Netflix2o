import requests from '../../utility/requests'
import Banner from '../Banner/Banner'
import Navbar from '../Navbar/Navbar'
import Row from '../Row/Row'
import './HomeScreen.css'
const HomeScreen = () => {
    return (
        <div className='homeScreen'>
            <Navbar />

            <Banner />

            <Row isLargeRow fetchURL={requests.fetchNetflixOriginals} title='Netflix Originals' />
            <Row title="Trending Now" fetchURL={requests.fetchTrending} />
            <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
            <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
        </div>
    )
}

export default HomeScreen