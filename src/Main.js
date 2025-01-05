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

    return (
        <>
            <Button onClick={handleGoToOtherPage}></Button>
            <Button onClick={handleGoToOtherPage4NoSearch}></Button>
            <Button onClick={handleGoToMobileMainPage}></Button>
            <Dictionary></Dictionary>
        </>
    );
};

export default Main;
