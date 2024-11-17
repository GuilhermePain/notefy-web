import { Link } from 'react-router-dom';
import imgLogoNotefy from '../../assets/svg/Logo Notefy.svg';

interface IHeaderProps {
  buttonLeft?: JSX.Element;
  buttonRight?: JSX.Element;
  title?: string;
  link?: any;
}

const Header = ({ buttonLeft, buttonRight, title, link }: IHeaderProps) => {
  return (
    <header className='shadow-xl'>
      <nav className='w-full flex items-center justify-between p-5'>
        {buttonLeft ? <Link to={link}>
          <div className='flex items-center text-[#6F3AB6]'>{buttonLeft} Voltar</div>
        </Link> :
          <Link to='/'>
            <div className='flex justify-center items-center gap-1'>
              <img src={imgLogoNotefy} alt="Logo notefy" className='w-10' />
              <h1 className='text-xl font-bold'>Notefy</h1>
            </div>
          </Link>
        }
        <span className='font-bold truncate'>{title}</span>
        {buttonRight}
      </nav>
    </header>
  )
}

export default Header;