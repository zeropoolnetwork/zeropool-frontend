import { cn } from '@bem-react/classname';
import React from 'react';

import './TransactionTime.scss';

const bem = cn('TransactionTime')

export const TransactionTime: React.FC<{ time: number }> = ({ time }) => {

   let displayedTime = '-'
   const convertedTime = new Date(time)

   if (convertedTime instanceof Date && !isNaN(convertedTime.getTime())) {
      displayedTime = `${convertedTime.getHours()}:${convertedTime.getMinutes()}`
   }

   return (
      <div className={bem()} >
         {displayedTime}
      </div>
   )
}