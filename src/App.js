import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from "./DetailPage";
import DetailNoSearchPage from "./DetailNoSearchPage";
import Main from "./Main"


const App = () => {
    return (
        <Router>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<Main />} />
                {/* 다른 페이지 */}
                <Route path="/detail" element={<DetailPage />} />
                {/* NoSearch 페이지 */}
                <Route path="/detailNoSearch" element={<DetailNoSearchPage />} />
            </Routes>
        </Router>

    );
};

export default App;
