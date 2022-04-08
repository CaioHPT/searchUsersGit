import { useRouter } from 'next/router'

import styles from '../../styles/User.module.css'

export default function Produto({id}){

    const { isFallback } = useRouter()

    if(isFallback){
        return <div className={styles.loading}><h5>Carregando...</h5></div>
    }

    return(
        
        <h1>Produto id: {id}</h1>

    )
}

export function getStaticProps(content){
    const {id} = content.params;

    return{
        props:{
            id: id
        }
    }
}

export function getStaticPaths(){

    return{
        paths: [{
            params: { id: '1' }
        },
        {
            params: { id: '2' }
        },
        {
            params: { id: '3' }
        }],
        fallback: true
    }

}