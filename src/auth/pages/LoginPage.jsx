
import { useDispatch } from 'react-redux';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { onChecking } from '../../store';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}




export const LoginPage = () => {

    const { startLogin } = useAuthStore();

    const dispatch = useDispatch();

    const {
        loginEmail,
        loginPassword,
        onInputChange: onLoginInputChange
    } = useForm(loginFormFields)

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });

    }

    const {
        registerName,
        registerEmail,
        registerPassword,
        registerPassword2,
        onInputChange: onRegisterInpuChange
    } = useForm(registerFormFields)


    const registerSubmit = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            alert('Las contraseñas no coinciden');
            return;
        }
        dispatch(onChecking());
        console.log({ registerName, registerEmail, registerPassword, registerPassword2 });
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"

                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInpuChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInpuChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInpuChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInpuChange}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}