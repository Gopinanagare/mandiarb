import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LiveArbitrage from './pages/LiveArbitrage';
import Markets from './pages/Markets';
import Analytics from './pages/Analytics';
import APIs from './pages/APIs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LiveArbitrage />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/apis" element={<APIs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
