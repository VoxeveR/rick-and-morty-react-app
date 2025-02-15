import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import CharacterList from './components/CharacterList';
 import CharacterDetail from './components/CharacterDetail';

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<CharacterList />} />
                    <Route path="/character/:id" element={<CharacterDetail />} />
                </Routes>
        </Router>
    );
};

export default App;