import help from './help.svg';
import './helpbutton.css';

const HelpButton = () => {
    return (
        <div className='helpbtn__wrapper'>
            <div className="helpbtn__content">
                <button className='btn btn-primary mb-2'>Задать вопрос</button>
                <button className='btn btn-primary'>Ответы на частые вопросы</button>
            </div>
            <button className='helpbtn'>
                <img src={help} alt="" />
            </button>
        </div>
    );
}

export default HelpButton;
