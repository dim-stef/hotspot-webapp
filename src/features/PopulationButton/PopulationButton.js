import React from 'react';
import {Typography} from 'antd';

const colors = {
  backgroundLow: '#4caf5096',
  backgroundMedium: '#03a9f45e',
  backgroundHigh: '#f403035e',
  textLow: 'green',
  textMedium: '#03a9f4',
  textHigh: '#f44336',
};

const PopulationButton = props => {
  const population = props.population.toLowerCase();

  return (
    <>
      <div
        style={{
          backgroundColor:
            population === 'low'
              ? colors.backgroundLow
              : population === 'medium'
              ? colors.backgroundMedium
              : colors.backgroundHigh,
          flexGrow: 1,
          display:'flex',
          borderRadius: 5,
          width: 80,
          maxWidth:80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography.Paragraph
          style={{
            padding:10,
            margin:0,
            fontWeight: 'bold',
            color:
              population === 'low'
                ? colors.textLow
                : population === 'medium'
                ? colors.textMedium
                : colors.textHigh,
          }}>
          {population === 'low'
            ? 'Λίγος'
            : population === 'medium'
            ? 'Μεσαίος'
            : 'Πολύς'}
        </Typography.Paragraph>
      </div>
    </>
  );
};

export default PopulationButton;
