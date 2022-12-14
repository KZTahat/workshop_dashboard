import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import { useData } from "../../../../dataContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const cities = ['Amman', 'Irbid', 'Jarash', 'AL-Zarqa', 'Madaba', 'Aqapa', 'Al-Salt', 'Al-karak', 'Al-Tafilah', 'Ajloun', 'Al-Ramtha', 'Al-balqa']

const UsersByCity = props => {
  const { className, ...rest } = props;
  const apiData = useData();  
  const classes = useStyles();
  const theme = useTheme();

  let citiesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  apiData.users.forEach((user) => {
    for (let index = 0; index < cities.length; index++) {
      if (user.city == cities[index]) citiesCount[index] += 1;
    }
  })

  const citiesTitles = [
    {
      title: 'Amman',
      value: Math.floor((citiesCount[0]/apiData.users.length)*100),
      color: 'red'
    },
    {
      title: 'Irbid',
      value: Math.floor((citiesCount[1]/apiData.users.length)*100),
      color: 'yellow'
    },
    {
      title: 'Jarash',
      value: Math.floor((citiesCount[2]/apiData.users.length)*100),
      color: 'blue'
    },
    {
      title: 'Aqaba',
      value: Math.floor((citiesCount[5]/apiData.users.length)*100),
      color: 'black'
    }
  ];

  const data = {
    datasets: [
      {
        data: citiesCount,
        backgroundColor: [
          'red', 'yellow', 'blue', 'orange', 'purple', 'black', 'darkblue', 'rebeccapurple', 'gold', 'darkmagenta', 'brown', 'hotpink'
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Amman', 'Irbid', 'Jarash', 'AL-Zarqa', 'Madaba', 'Aqapa', 'Al-Salt', 'Al-karak', 'Al-Tafilah', 'Ajloun', 'Al-Ramtha', 'Al-balqa']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Users By City"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {citiesTitles.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByCity.propTypes = {
  className: PropTypes.string
};

export default UsersByCity;
