import {useLocation, useNavigate as originUseNavigate} from "react-router-dom";

function useNavigate(href: string, state?: any) {
    const location = useLocation();
    const navigate = originUseNavigate();

    if (state != null) {
        sessionStorage.setItem(location.pathname, JSON.stringify(state))
    }

    return navigate(href)
}