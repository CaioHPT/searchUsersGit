import Image from "next/image"
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router"
import { BsBoxArrowLeft } from "react-icons/bs";
import styles from '../../styles/User.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function User({ user }) {

    const [open, setOpen] = useState(true);

    const { isFallback } = useRouter()

    if (isFallback) {
        return (
            <div className={styles.loading}>
                <CircularProgress color="primary" />
            </div>
        )
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    return (
        <div className={styles.container}>
            {user.message === "Not Found" ? 
            <>
                <h1>404 - Usuário não encontrado</h1>
                <Link href="/">
                        <button className={styles.button}><BsBoxArrowLeft /> Voltar</button>
                </Link>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Usuário não encontrado
                    </Alert>
                </Snackbar>
            </> :
                <>
                    <img src={user.avatar_url} className={styles.image} />
                    <h1>{user.login}</h1>
                    <span>{user.name}</span>
                    <p>{user.bio}</p>
                    <Link href="/">
                        <button className={styles.button}><BsBoxArrowLeft /> Voltar</button>
                    </Link>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Usuário encontrado com sucesso
                        </Alert>
                    </Snackbar>
                </>}

        </div>
    )
}

export const getStaticPaths = async () => {
    const response = await fetch(`https://api.github.com/users`)
    const data = await response.json()

    const paths = data.map(user => { return { params: { login: user.login } } })


    return {
        paths,
        fallback: true
    }
}


export const getStaticProps = async (context) => {
    const { login } = context.params
    const response = await fetch(`https://api.github.com/users/${login}`)
    const data = await response.json()

    return {
        props: {
            user: data
        },
        revalidate: 10
    }
}