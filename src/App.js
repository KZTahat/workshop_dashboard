import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/scss/index.scss';
import Routes from './Routes';
import ioClint from 'socket.io-client';
import { DataProvider } from './dataContext';


const socket = ioClint.connect(
  `${process.env.REACT_APP_SOCKET_HOST}`,
  {
    transports: ['websocket']
  }
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Router>
          <Routes />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export { App, socket };
