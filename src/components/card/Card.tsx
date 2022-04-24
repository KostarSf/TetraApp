import st from './Card.module.css';

type Props = {
    title: string;
    description: string;
    date: string;
    isNew: boolean;
    onClick: () => void;
}

const Card: React.FC<Props> = ({
    title,
    description,
    date,
    isNew,
    onClick
}) => {
    return (
        <div className={"card " + st.card} style={{ cursor: 'pointer' }} onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>

                <p className="card-text">{description}</p>
                <p className="text-primary fs-5 mb-0 d-flex justify-content-between align-items-end"><span>{date}</span> {isNew && <span className="badge bg-primary">Новое</span>}</p>
            </div>
        </div>
    );
}

export default Card;
