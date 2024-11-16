import Button from "../../components/Button";
import ImgLogin from "../../assets/svg/img_login_notefy.svg";
import { FaEye } from "react-icons/fa";

const ResetPassword = () => {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <main className="flex w-[360px] h-auto justify-center items-center shadow-2xl rounded-2xl">
                <aside className="hidden">
                    <img className="w-[400px] h-auto" src={ImgLogin} alt="Imagem Login Notefy" />
                </aside>
                <aside className="w-full">
                    <form className="w-full h-full flex flex-col px-10 py-6">
                        <h1 className="text-center font-bold text-2xl mb-6">
                            Redefinir senha
                        </h1>
                        <div className='h-[2px] m-auto w-[150px] bg-[#6F3AB6]'></div>
                        <div className="flex flex-col gap-4 mb-5">
                            <div className="flex shadow-lg rounded-md">
                                <input className="p-4 w-full rounded-l-md outline-none" type="password" placeholder="Nova senha" />
                                <div className="flex items-center justify-center pr-3">
                                    <FaEye color="#6F3AB6" />
                                </div>
                            </div>
                            <div className="flex shadow-lg rounded-md">
                                <input className="p-4 w-full rounded-l-md outline-none" type="password" placeholder="Confirme sua nova senha" />
                                <div className="flex items-center justify-center pr-3">
                                    <FaEye color="#6F3AB6" />
                                </div>
                            </div>
                        </div>
                        <Button
                            text="Redefinir"
                            width="w-full"
                            padding='p-2'
                        />
                    </form>
                </aside>
            </main>
        </div>
    );
};

export default ResetPassword;
