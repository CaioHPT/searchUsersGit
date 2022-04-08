import styles from '../styles/Home.module.css'
import { VscGithubInverted } from "react-icons/vsc";
import { useState } from 'react';

export default function Home() {

  const [textInput, setTextInput] = useState('')

  function searchUser(event){
    event.preventDefault();
    window.location.href = `/users/${textInput}`
  }

  return (
    <div className={styles.container}>
      {/* <h1>Hello word, {props.valor.login}</h1> */}
      <VscGithubInverted />
      <h5>Pesquise aqui um usuário do github</h5>
      <form className={styles.form} onSubmit={searchUser}>
        <input type="text" onChange={(input) => setTextInput(input.target.value)}/>
        <input type="submit" value="Pesquisar" />
      </form>
    </div>
  )
}
