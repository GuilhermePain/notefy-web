import Button from "../../components/Button"
import Header from "../../components/Header"
import imgNotesLandingPage from "../../assets/svg/Notes-rafiki.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-full">
      <Header />
      <main className="h-auto w-full p-6 md:flex">
        <aside className="flex flex-col items-start gap-4 md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-[#6F3AB6]" >Notefy</h1>
            <h2 className="text-2xl font-light">Salve suas ideias e organize suas anotações em um só lugar!</h2>
          </div>
          <Link to='/entrar'>
            <Button
              type='primary'
              text='Comece agora gratuitamente!'
              padding="px-6 py-2"
            />
          </Link>
        </aside>
        <aside className="md:w-80%">
          <img
            className="md:w-full"
            src={imgNotesLandingPage} alt="Imagem Landing Page"
          />
        </aside>
      </main>
    </div>

  )
}

export default LandingPage