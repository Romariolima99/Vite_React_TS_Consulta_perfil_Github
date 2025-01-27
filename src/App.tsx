import './App.css'
import axios from 'axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

type GITHUBResponse = {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: string;
};


function App() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("Aguardando...");
  const [bio, setBio] = useState("Aguardando...");
  const [avatarURL, setAvatarURL] = useState("Aguardando...");
  const [public_reposURL, setfollowers] = useState("Aguardando...");

  const handleSearch = () => {
    axios.get<GITHUBResponse>(`https://api.github.com/users/${search}`)
      .then((res) => {
        if (res.status === 200) {
          notifySucess();
          console.log("sucesso");

          setName(res.data.name);
          setBio(res.data.bio);
          setAvatarURL(res.data.avatar_url);
          setfollowers(res.data.public_repos);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          notifyStatus404();
          console.log("erro");
        } else {
          console.error("Erro ao buscar usuário:", error);
        }
      });
  };

  const notifySucess = () => {
    toast.success("Consulta realizada com sucesso", {
      className: 'custom-toast',

    })
  };

  const notifyStatus404 = () => {
    toast.error("Usuario não encontrado", {
      className: 'custom-toast-erro'

    })
  };

  return (
    <>
      <ToastContainer position="top-center" bodyStyle={{ width: '100vw' }} />
      <div className="container-app">
        <div className="container">
          <header className='header-top'>
            <ul>
              <li>APLICAÇÃO GITHUB</li>
            </ul>
          </header>
          <main>
            <div className="form">
              <h1>DIGITE O USUARIO</h1>
              <input
                type="text"
                placeholder="Digite um usuario"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}>Buscar</button>
            </div>
            <div className="content">
              <div>
                <img src={avatarURL} alt="" />
                <h1>{name}</h1>
                <p>{bio}</p>
                <p>{'Repositórios: ' + public_reposURL}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>


  )
}

export default App;
