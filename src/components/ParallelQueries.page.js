import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperHeroes = () => {
    return axios.get('http://loacalhost:4000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://loacalhost:4000/friends')
}

export const ParralelQueriesPage = () => {

    const {data: superheroes} = useQuery('super-heroes', fetchSuperHeroes)
    const {data: friends} = useQuery('friends', fetchFriends)

    return <div>ParralelQueriesPage</div>
}