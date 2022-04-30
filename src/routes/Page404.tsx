import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Page404 = () => {
    const location = useLocation();

    return (
        <div className='container py-2'>
            <h2>Ошибка 404</h2>
            <p>Страницы <b>{location.pathname}</b> не существует.</p>
            <p>Вернуться на <Link to={'/'}>Главную</Link></p>
        </div>
    );
};

export default Page404;
