import React from "react";

type Props = {
  title: string;
  color: string;
  children: React.ReactNode | React.ReactNode[]
}

const CardList: React.FC<Props> = ({ title, color, children }) => {
  return (
    <div className="d-flex flex-column gap-2 mt-4" style={{ width: '18rem', }}>
      <div className="text-center p-2">{title}</div>
      <div className="rounded-2" style={{ backgroundColor: color, height: '6px' }}></div>
      {children}
      {!children &&
        <div className="fs-4 text-center py-4" style={{ color: '#ccc', }} >
          Задач еще нет!
        </div>
      }
    </div>
  );
}

export default CardList;
