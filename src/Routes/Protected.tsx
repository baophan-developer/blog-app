import { useLayoutEffect, useState } from "react";
import { getDataLocalStore } from "../utils";
import { Outlet, useNavigate } from "react-router-dom";

function Protected() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const user = getDataLocalStore("user");
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
            navigate("/login");
        }
    }, [navigate]);

    if (isLogin) return <Outlet />;
    return null;
}

export default Protected;
