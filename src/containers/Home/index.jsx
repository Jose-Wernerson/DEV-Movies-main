import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Background, 
    Info, 
    Poster, 
    Container, 
    ContainerButtons } 
from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import { getMovies, 
    getPopularPerson, 
    getPopularSeries, 
    getTopMovies, 
    getTopSeries } 
from '../../services/getData'


function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [TopMovies, setTopMovies] = useState()
    const [TopSeries, setTopSeries] = useState()
    const [PopularSeries, setPopularSeries] = useState()
    const [PopularPerson, setPopularPerson] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getPopularPerson()
            ])
                .then(([movie, topMovies, topSeries, popularSeries, popularPerson]) => {
                    setMovie(movie)
                    setTopMovies(topMovies)
                    setTopSeries(topSeries)
                    setPopularSeries(popularSeries)
                    setPopularPerson(popularPerson)
                })
                .catch((error) => console.error(error))
        }

        getAllData()
    }, [])



    return (
        <>
            {movie && (
                <Background img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red onClick={() => navigate(`/detalhe/${movie.id}`)}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)}>
                                    Assista o Trailer</Button>
                            </ContainerButtons>
                        </Info>

                        <Poster>
                            <img
                                alt='capa-do-filme'
                                src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Background>
            )}
            {TopMovies && <Slider info={TopMovies} title={'Top Filme'} />}
            {TopSeries && <Slider info={TopSeries} title={'Top Séries'} />}
            {PopularSeries && <Slider info={PopularSeries} title={'Séries Populares'} />}
            {PopularPerson && <Slider info={PopularPerson} title={'Top Atores'} />}
        </>
    )
}
export default Home
