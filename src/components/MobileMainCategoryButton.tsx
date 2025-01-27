import * as React from 'react';

import { MobileMainCategoryButtonProps } from './mobile/types';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiClient from "../api/api";

export const MobileMainCategoryButton: React.FC<MobileMainCategoryButtonProps> = ({ label,id }) => {
    const navigate = useNavigate();
    const handleOnClickCategoryBtn = async (id: string) => {
        try{
            const response = await apiClient.get('/api/terms', {
                params: {
                    page : 0,
                    size: 1000000000,
                    categoryId: id
                },
            });
            navigate('/mobileDetail', { state: { results: [response.data.response] , categoryId : id} });
        }catch (e){
            console.error('데이터 로드 중 오류:', e);
        }
    };

    return (
        <button className="category-button" tabIndex={0} onClick={()=>{handleOnClickCategoryBtn(id)}}>
            {label}
            <style>{`
        .category-button {
          color: #1F1F1F;
          white-space: nowrap;
          text-align: center;
          letter-spacing: -0.45px;
          font: 500 16px/2 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .category-button:hover {
          color: rgba(31, 31, 31, 1);
        }
      `}</style>
        </button>
    );
};