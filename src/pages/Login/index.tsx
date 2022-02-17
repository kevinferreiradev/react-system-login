import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    //onChange={e => setEmail(e.target.value)} segundo metodo para passar no input

    const handleLogin = async () => {
        if(email && password) {
            const isLogged = await auth.signin(email, password);
            if(isLogged) {
                navigate('/');
            } else {
                alert("infelizmente deu errado");
            }
        }
    }

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    return (
        <div>
            <h2>Pagina Fechada</h2>

            <input
                type="text" 
                value={email} 
                onChange={handleEmailInput}
                placeholder="Digite seu email" 
                
            />

            <input 
                type="text" 
                value={password} 
                onChange={handlePasswordInput}
                placeholder="Digite sua senha" 
            />

            <button onClick={handleLogin}> Entrar </button>
        </div>
    );
}