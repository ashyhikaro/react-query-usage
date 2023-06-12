import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
    return request({url: '/superheroes'})
    // return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return request({url: '/superheroes', method: 'post', data: hero})
    // return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery(
        ['super-heroes'], 
        fetchSuperHeroes,
        {
            // cacheTime: 5000, --час зберігнання даних (дефолт: 5хв)
            // staleTime: 30000, --час після якого дані вважаються застарілими (дефолт: 0)
            // refetchOnMount: true, --автооновлення даних, якщо вони застарілі
            // refetchOnWindowFocus: true, --оновлення даних після отримання фокусу сторінкою
            // refetchInterval: 2000, --час автооновлення даних
            // refetchIntervalInBackground: true, --оновлення даних навіть якщо сторінка відкрита у фоновому режимі
            // enabled: false, --завантаження даних одразу при відкритті сторінки
             onSuccess, // --спрацьовує при успіху
             onError, // --спрацьовує при помилці
            // select: (data) => data.data.map((hero) => hero.name) // трансформує отримані дані
        }
    )
}

export const useAddSuperHeroData = () => {
    const client = useQueryClient()
    return useMutation(addSuperHero, {
    //     onSuccess: (data) => {
    //         // client.invalidateQueries('super-heroes')
    //         client.setQueryData('super-heroes', (oldQueryData) => {
    //             return {
    //                 ...oldQueryData,
    //                 data: [...oldQueryData.data, data.data]
    //             }
    //         })
    //     }
        onMutate: async (newHero) => {
            await client.cancelQueries('super-heroes')
            const prev = client.getQueryData('super-heroes')
            
            client.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data, 
                        {id: oldQueryData?.data?.length + 1, ...newHero}
                    ]
                }
            })

            return {
                prev,
            }
            
        },
        onError: (_error, _hero, context) => {
            client.setQueryData('super-heroes', context.prev)
        },
        onSettled: () => {
            client.invalidateQueries('super-heroes')
        }
    })
    
}