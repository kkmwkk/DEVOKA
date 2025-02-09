import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileMain from "./MobileMain";
import {MobileDetailDictionaryPage} from "./components/MobileDetailDictionaryPage";
import MobileDetailSearchPage from "./components/mobileDetailSearchPage/MobileDetailSearchPage";
import MobileRecentSearchPage from "./components/mobileRecentSearchPage/MobileRecentSearchPage";
import MobileEmptySearchPage from "./components/mobileEmptySearchPage/MobileEmptySearchPage";


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Mobile 페이지 */}
                <Route path="/" element={<MobileMain />} />
                {/* MobileDetail 페이지 */}
                <Route path="/mobileDetail" element={<MobileDetailDictionaryPage />} />
                {/* MobileDetailSearch 페이지 */}
                <Route path="/search/popular" element={<MobileDetailSearchPage/>}/>
                {/* MobileRecentSearchPage 페이지 */}
                <Route path="/search/recent" element={<MobileRecentSearchPage />} />
                {/* MobileEmptySearchPage 페이지 */}
                <Route path="/search/empty" element={<MobileEmptySearchPage />} />
                {/* 메인 페이지 */}
                {/*<Route path="/" element={<Main />} />*/}
                {/* Detail 페이지 */}
                {/*<Route path="/detail" element={<DetailPage />} />*/}
                {/* Detail NoSearch 페이지 */}
                {/*<Route path="/detailNoSearch" element={<DetailNoSearchPage />} />*/}
            </Routes>
        </Router>

    );
};

export default App;
