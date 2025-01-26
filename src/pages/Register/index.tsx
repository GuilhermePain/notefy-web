import ImgLogin from '../../assets/svg/img_login_notefy.svg'
import { FaUser } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import { FaEyeSlash } from 'react-icons/fa6';
import Button from '../../components/Button';
import { registerUser } from '../../services/authService';
import { useState } from 'react';
import { validateName, validateEmail, validatePassword } from '../../utils/fieldsValidation';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password, confirmPassword);

        if (nameError || emailError || passwordError) {
            setErrorMessage(nameError || emailError || passwordError);
            return;
        }

        setErrorMessage(null);

        try {
            setLoading(true);
            const response = await registerUser(name, email, password);
            toast.success("Cadastrado com sucesso!");
            navigate('/entrar');
            return response;
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário: ", error);
            setErrorMessage(error);
        } finally {
            setLoading(false);
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
                            Cadastre-se
                        </h1>
                        <div className='h-[2px] m-auto w-[150px] bg-[#6F3AB6]'></div>
                        <div className="flex flex-col gap-4 mb-5">
                            <div className="flex shadow-lg rounded-md">
                                <input
                                    className="p-4 w-full rounded-l-md outline-none"
                                    type="text"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className="flex items-center justify-center pr-3">
                                    <FaUser color="#6F3AB6" />
                                </div>
                            </div>
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
                                    )}
                                </div>
                            </div>
                            <div className="flex shadow-lg rounded-md">
                                <input
                                    className="p-4 w-full rounded-l-md outline-none"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirmar senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="flex items-center justify-center pr-3">
                                    {showConfirmPassword ? (
                                        <FaEyeSlash
                                            onClick={toggleShowConfirmPassword}
                                            color="#6F3AB6"
                                        />
                                    ) : (
                                        <FaEye
                                            onClick={toggleShowConfirmPassword}
                                            color="#6F3AB6"
                                        />
                                    )}
                                </div>
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-center mb-2">{errorMessage}</p>
                            )}
                        </div>
                        <Button
                            text="Cadastrar"
                        />
                        <p className="text-center mt-6">
                            Já tem uma conta? <Link to="/entrar" className="text-[#6F3AB6]">Entrar</Link>
                        </p>
                    </form>
                </aside>
            </main>
            {
                loading && (<LoadingSpinner />)
            }
        </div>
    );
};

export default Register;
