import imgLogoNotefy from '../../assets/svg/Logo Notefy.svg';
import Button from '../Button';
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <header className='shadow-xl'>
      <nav className='w-full flex justify-between p-5'>
        <div className='flex justify-center items-center gap-1'>
          <img src={imgLogoNotefy} alt="Logo notefy" className='w-10' />
          <h1 className='text-xl font-bold'>Notefy</h1>
        </div>
        <IoMenu
          color='#6F3AB6'
          size={40}
        />
      </nav>
    </header>
  )
}

export default Header;