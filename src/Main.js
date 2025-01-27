import {Dictionary} from "./components/Dictionary";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd";

const Main = () => {

    const navigate = useNavigate();
    // detailPage
    const handleGoToOtherPage = () => {
        navigate('/detail');
    };
    
    // detailPage(NoSearch)
    const handleGoToOtherPage4NoSearch = () => {
        navigate('/detailNoSearch');
    };

    // MainPage(Mobile)
    const handleGoToMobileMainPage = () => {
        navigate('/mobile')
    }

    const handleGoToMobileDetailPage = () => {
        navigate('/mobileDetail')
    }

    const searchPopular = () => {
        navigate('/search/popular')
    }

    const searchRecent = () => {
        navigate('/search/recent')
    }

    const searchEmpty = () => {
        navigate('/search/empty')
    }

    return (
        <>
            <Button onClick={handleGoToOtherPage}></Button>
            <Button onClick={handleGoToOtherPage4NoSearch}></Button>
            <Button onClick={handleGoToMobileMainPage}></Button>
            <Button onClick={handleGoToMobileDetailPage}></Button>

            <Button onClick={searchPopular}></Button>
            <Button onClick={searchRecent}></Button>
            <Button onClick={searchEmpty}></Button>
            <Dictionary></Dictionary>
        </>
    );
};

export default Main;
