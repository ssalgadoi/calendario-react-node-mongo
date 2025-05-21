import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())

        console.log({ email, password });
        try {
            // const resp = await calendarApi.post('/auth/l', { email, password });
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            console.log({error});
            
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }
    // const startLogout = () => {
    //     localStorage.clear(); // o localStorage.removeItem('token') si prefieres
    //     dispatch(onLogout());
    // };
    return {
        errorMessage,
        status,
        user,
        startLogin,
    }
}