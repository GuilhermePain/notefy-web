import Button from "../../components/Button";
import ImgLogin from "../../assets/svg/img_login_notefy.svg";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { validateEmail, validatePasswordLogin } from "../../utils/fieldsValidation";
import { MdEmail } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePasswordLogin(password);

    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    if(passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    setErrorMessage(null);

    try {
      const response = await loginUser(email, password);
      console.log("Usuário logado com sucesso!");
      const token = response.access_token;
      Cookies.set('token', token);
      navigate("/minhasnotas");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Email ou senha incorretos."); 
      } else {
        setErrorMessage("Erro inesperado ao fazer login.");
      }
    }

  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <main className="flex w-[360px] h-auto justify-center items-center shadow-2xl rounded-2xl">
        <aside className="hidden">
          <img className="w-[400px] h-auto" src={ImgLogin} alt="Imagem Login Notefy" />
        </aside>
        <aside className="w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col px-10 py-6">
            <h1 className="text-center font-bold text-2xl mb-6">
              Seja bem-vindo!
            </h1>
            <div className='h-[2px] m-auto w-[150px] bg-[#6F3AB6]'></div>
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex shadow-lg rounded-md">
                <input
                  className="p-4 w-full rounded-l-md outline-none"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-center justify-center pr-3">
                  <MdEmail color="#6F3AB6" />
                </div>
              </div>
              <div className="flex shadow-lg rounded-md">
                <input
                  className="p-4 w-full rounded-l-md outline-none"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-center pr-3">
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={toggleShowPassword}
                      color="#6F3AB6"
                    />
                  ) : (
                    <FaEye
                      onClick={toggleShowPassword}
                      color="#6F3AB6"
                    />
                  )}                </div>
              </div>
              <p className="text-right">
                <a className="text-[#6F3AB6]"
                  href="/esqueceusuasenha">Esqueceu sua senha?</a>
              </p>
              {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
              )}
            </div>
            <Button
              text="Entrar"
              width="w-full"
              padding='p-2'
            />
            <p className="text-center mt-6">
              Não tem uma conta? <a href="/cadastro" className="text-[#6F3AB6]">Cadastre-se</a>
            </p>
          </form>
        </aside>
      </main>
    </div>
  );
};

export default Login;
