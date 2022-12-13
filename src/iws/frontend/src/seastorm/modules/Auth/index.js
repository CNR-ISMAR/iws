import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUserinfoQuery } from "../../../services/auth";
import { authActions, authSelectors } from "../../store/auth.slice";

export default function AuthLoader({ children }) {
    const dispatch = useDispatch();
    const [getUser] = useLazyGetUserinfoQuery();
    const isReady = useSelector(authSelectors.isReady);

    useEffect(() => {
        async function fetch() {
            try {
                const r = await getUser()
                if (!r.isError) {
                    dispatch(authActions.setUser(r.data))
                } else {
                    dispatch(authActions.setUser(null))
                }
            } catch(e) {
                console.warn(e)
            }
        }
        fetch();
    }, [])

    if (!isReady) {
        return (
            <Spinner />
        )
    }

    return children;
}