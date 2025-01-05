import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from "./DetailPage";
import DetailNoSearchPage from "./DetailNoSearchPage";
import Main from "./Main"
import MobileMain from "./MobileMain";


const App = () => {
    return (
        <Router>
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<Main />} />
                {/* Detail 페이지 */}
                <Route path="/detail" element={<DetailPage />} />
                {/* Detail NoSearch 페이지 */}
                <Route path="/detailNoSearch" element={<DetailNoSearchPage />} />
                {/* Mobile 페이지 */}
                <Route path="/mobile" element={<MobileMain />} />
            </Routes>
        </Router>

    );
};

export default App;
