import Button from "../../components/Button";
import ImgLogin from "../../assets/svg/img_login_notefy.svg";
import { MdEmail } from "react-icons/md";
import { FormEvent, useEffect, useState } from "react";
import { forgotPassword } from "../../services/authService";
import { validateEmail } from "../../utils/fieldsValidation";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false); // Para identificar se foi bem-sucedido
    const [counter, setCounter] = useState<number>(0); // Contador de 30 segundos

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);

        if (emailError) {
            setMessage(emailError);
            setSuccess(false);
            return;
        }

        try {
            const response = await forgotPassword(email);
            if (!response.ok) {
                setMessage("Erro ao enviar email, tente novamente.");
                setSuccess(false);
            }
            setMessage("Link enviado, verifique seu email. (Tente novamente em 30s)");
            setSuccess(true);
            setCounter(30);
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage("Erro ao enviar o email. Tente novamente.");
            }
            setSuccess(false);
        }
    };

    // Atualizar o contador e a mensagem a cada segundo quando estiver em contagem
    useEffect(() => {
        let timer: number;
        if (counter > 0) {
            timer = setTimeout(() => {
                setCounter(prevCounter => prevCounter - 1);
                setMessage(`Link enviado, verifique seu email. (Tente novamente em ${counter - 1}s)`); // Atualizar a mensagem com o contador
            }, 1000);
        } else if (counter === 0 && success) {
            setMessage("Link enviado, verifique seu email.");
        }
        return () => clearTimeout(timer); // Limpar o timeout ao desmontar o componente
    }, [counter, success]);

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
                            Esqueceu sua senha?
                        </h1>
                        <div className='h-[2px] m-auto w-[150px] bg-[#6F3AB6]'></div>
                        <p className="text-center py-3">Digite seu email para enviarmos um link de redefinição de senha.</p>
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
                            {message && (
                                <p className={`text-center mb-4 ${success ? "text-green-500" : "text-red-500"}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="primary"
                            text="Enviar"
                            width="w-full"
                            padding='p-2'
                            disabled={counter > 0} // Desabilitar botão durante o contador
                        />
                        <p className="text-center mt-6">
                            Já tem uma conta? <Link to="/entrar" className="text-[#6F3AB6]">Entrar</Link>
                        </p>
                    </form>
                </aside>
            </main>
        </div>
    );
};

export default ForgotPassword;
