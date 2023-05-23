import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from "./pages/Home";
import "./styles/css/all.css"


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
    <Home/>
    </div>
     </ThemeProvider>
  );
}

export default App;
