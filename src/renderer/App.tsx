import { Box } from '@mui/material';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './page/Main';
import Setting from './page/Setting';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Navigation />
        <Box sx={{ mx: 1 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}
