import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";
import Button from "../../components/Button"
import Header from "../../components/Header"
import imgNotesLandingPage from "../../assets/svg/Notes-rafiki.svg";
import { Link } from "react-router-dom";
import { IDecodedToken } from "../../@types/types";

const LandingPage = () => {
  const token = Cookies.get('token');
  const { decodedToken, isExpired } = useJwt<IDecodedToken>(token || "");
  const [userLogged, setUserLogged] = useState<boolean>(false);

  useEffect(() => {
    if (token || !isExpired) {
      setUserLogged(true);
    }
  }, [decodedToken, isExpired]);

  return (
    <div className="h-full">
      <Header />
      <main className="h-auto w-full p-6 md:flex md:justify-between">
        <aside className="flex flex-col items-start gap-4 md:items-start justify-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-[#6F3AB6]" >Notefy</h1>
            <h2 className="text-2xl font-light">Salve suas ideias e organize suas anotações em um só lugar!</h2>
          </div>
          <Link to={userLogged ? "/minhasnotas" : "/entrar"}>
            <Button
              text='Comece agora gratuitamente!'
            />
          </Link>
        </aside>
        <aside className="md:w-80%">
          <img
            className="md:w-[600px]"
            src={imgNotesLandingPage} alt="Imagem Landing Page"
          />
        </aside>
      </main>
    </div>

  )
}

export default LandingPage;
