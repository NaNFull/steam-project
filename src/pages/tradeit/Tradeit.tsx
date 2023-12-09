import { useEffect, useState } from 'react';
import { useBoolean } from 'usehooks-ts';

// import { fetchInventoryData } from './functions';
import rate from './tempExchangeRate.ts';
import type { IResponseData } from './types';

const { RUB } = rate;
export default function Tradeit() {
  const [data, setData] = useState<IResponseData>();
  const { toggle: toggleUSD, value: isUSD } = useBoolean(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/')
      .then((response) => {
        console.log(response.json());
        // setData(response);
      })
      .catch(() => console.log('error'));
  }, []);

  return (
    <>
      <h1 onClick={toggleUSD}>
        USD/RUB - {RUB}₽ {isUSD ? 'Вкл' : 'Выкл'}
      </h1>
      {data?.items.map((item, index) => (
        <div key={index}>
          <img alt={item.name} src={item.imgURL} />
          {item.name} | {item.price * (isUSD ? 1 : RUB)} {isUSD ? '$' : '₽'} | {data?.counts[item.groupId]} кол-во
        </div>
      ))}
    </>
  );
}
