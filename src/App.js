import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import {BrowserRouter as Router } from 'react-router-dom';//
import './assets/scss/index.scss';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
