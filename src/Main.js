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

    const mobileSearch1 = () => {
        navigate('/mobileSearch1')
    }

    const mobileSearch2 = () => {
        navigate('/mobileSearch2')
    }

    const mobileSearch3 = () => {
        navigate('/mobileSearch3')
    }

    return (
        <>
            <Button onClick={handleGoToOtherPage}></Button>
            <Button onClick={handleGoToOtherPage4NoSearch}></Button>
            <Button onClick={handleGoToMobileMainPage}></Button>
            <Button onClick={handleGoToMobileDetailPage}></Button>

            <Button onClick={mobileSearch1}></Button>
            <Button onClick={mobileSearch2}></Button>
            <Button onClick={mobileSearch3}></Button>
            <Dictionary></Dictionary>
        </>
    );
};

export default Main;
