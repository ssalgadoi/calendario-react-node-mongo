import { useSelector } from "react-redux"
import { calendarApi } from "../api";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async ({ email, password }) => {

        console.log({ email, password });
        try {
            // const resp = await calendarApi.post('/auth/l', { email, password });
            const resp = await calendarApi.post('/auth', { email, password})
            console.log({ resp });

        } catch (error) {
            console.log({ error });
        }
    }
    return {
        errorMessage,
        status,
        user,
        startLogin

    }
}