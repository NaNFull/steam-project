// import { fetchInventoryData } from '@src/pages/tradeit/functions;
// import { useEffect, useState } from 'react';
import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';

import * as responseData from './temp.json';
// import { fetchInventoryData } from './functions';
import rate from './tempExchangeRate';
import type { IResponseData } from './types';

const { RUB } = rate;
export default function Tradeit() {
  const [data] = useState<IResponseData>(responseData as any);
  const { toggle: toggleUSD, value: isUSD } = useBoolean(false);

  // После создания таблицы протестировать загрузку данных
  // useEffect(() => {
  //   fetchInventoryData()
  //     .then((response) => {
  //       setData(response);
  //     })
  //     .catch(() => console.log('error'));
  // }, []);

  // TODO: Сделать таблицу
  // TODO: Добавить сравнение со стимом/Buff/Analitics
  // TODO: Добавить фильтрацию
  // TODO: Вынести этот код в майн и
  return (
    <>
      <h1 onClick={toggleUSD}>
        USD/RUB - {RUB.toFixed(2)}₽ {isUSD ? 'Вкл' : 'Выкл'}
      </h1>
      {data?.items.map(({ groupId, id, name, price }) => (
        <div key={id}>
          {/* <img alt={item.name} src={item.imgURL} /> */}
          <div className="name-text">{name}</div>
          <div className="price-text">
            {((price / 100) * (isUSD ? 1 : RUB)).toFixed(2)} {isUSD ? '$' : '₽'}
          </div>
          <div className="count-text">{data?.counts[groupId]} кол-во</div>
        </div>
      ))}
    </>
  );
}
