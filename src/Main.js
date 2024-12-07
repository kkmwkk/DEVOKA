import {Dictionary} from "./components/Dictionary";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd";

const Main = () => {

    const navigate = useNavigate();
    const handleGoToOtherPage = () => {
        navigate('/detail');
    };


    return (
        <>
        <Button onClick={handleGoToOtherPage}></Button>
        <Dictionary></Dictionary>
        </>
    );
};

export default Main;
