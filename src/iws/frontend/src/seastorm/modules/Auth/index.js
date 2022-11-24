import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetUserinfoQuery } from "../../../services/auth";
import { authActions } from "../../store/auth.slice";

export default function AuthLoader() {
    const dispatch = useDispatch();
    const [getUser] = useLazyGetUserinfoQuery()

    useEffect(() => {
        async function fetch() {
            try {
                const r = await getUser()
                if (!r.isError) {
                    dispatch(authActions.setUser(r.data))
                }
            } catch(e) {
                console.warn(e)
            }
        }
        fetch();
    }, [])

    return null;
}