import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type RedirectProps = {
    to: string,
    replace?: boolean,
}

const Redirect: React.FC<RedirectProps> = ({to: route, replace = false}) => {
    const navigate = useNavigate();

    useEffect(() => navigate(route, {replace}), []);

    return <></>;
};

export default Redirect;
