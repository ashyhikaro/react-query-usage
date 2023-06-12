import { useAddSuperHeroData, useSuperHeroesData, } from "../hooks/useSuperHeroesData"
import { Link } from "react-router-dom"
import { useState } from "react"

const RQSuperHeroesPage = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

    const onSuccess = (data) => {
        console.log('Success', data)
    }

    const onError = (error) => {
        console.log('Error', error)
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError)
    
    const {mutate: addHero} = useAddSuperHeroData()
    
    if (isLoading || isFetching) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    const handleAddHeroClick = () => {
        const hero = {name, alterEgo}
        addHero(hero)
    }

    return (
        <div>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="text"
                    value={alterEgo}
                    onChange={(e) => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            <button onClick={refetch}>Fetch heroes</button>
            {data?.data.map(hero => <div key={hero.id}>
                <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>)}
        </div>
    )
}

export default RQSuperHeroesPage;