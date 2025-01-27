import axios from "axios";

// REACT_APP_Ec2Server_IP 운영 배포시, 해당 URL 로 변경만 해주면 됨.
// TODO : aws(ec2) 환경 변수 설정 기능을 설정
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_LocalServer_IP, // 환경 변수에서 URL 가져오기
    timeout: 5000, // 요청 타임아웃 설정 (선택 사항)
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;