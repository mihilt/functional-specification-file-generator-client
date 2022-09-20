import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Setting from './page/Setting';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}
