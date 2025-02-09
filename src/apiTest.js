 import React, { useState, useEffect , useRef} from 'react';
import { Card, Input, Button, Modal, Form, message } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Typography } from 'antd';
import axios from 'axios'; // axios를 사용하여 API 호출

const { Title } = Typography;

const ApiTest = () => {
    const [termNo, setTermNo] = useState(''); // term_no를 저장
    const [selectedTerm, setSelectedTerm] = useState({});  // term_no도 포함된 객체
    const [selectedEngName, setSelectedEngName] = useState('');
    const [selectedAbbName, setSelectedAbbName] = useState('');
    const [selectedkorName, setSelectedkorName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedDefinition, setSelectedDefinition] = useState('');



    const [wordSearch, setWordSearch] = useState('');
    const [creatorSearch, setCreatorSearch] = useState('');
    const [modifierSearch, setModifierSearch] = useState('');
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // 신규 등록 모달å
    const [form] = Form.useForm();
    const gridRef = useRef(null); // 그리드 ref 추가


    const columnDefs = [
        { headerName: 'termNo', field: 'termNo' }, // TODO : 히든값으로 설정해야함.
        { headerName: '단어명', field: 'korName' },
        { headerName: '단어명(영문)', field: 'engName' },
        { headerName: '단어명(abb)', field: 'abbName' },
        { headerName: '단어설명', field: 'definition', flex: 1 },
        { headerName: '생성자', field: 'creator' },
        { headerName: '생성일자', field: 'createdDate' },
        { headerName: '수정자', field: 'modifier' },
        { headerName: '수정일자', field: 'modifiedDate' },
    ];

    useEffect(() => {
        fetchData();
    }, []);


    /** handle function Start !!!!! */

    const handleRowDoubleClick = (event) => {
        const { data } = event;
        setTermNo(data.termNo);
        setSelectedkorName(data.korName);
        setSelectedDefinition(data.definition);
        setSelectedTerm(data.termNo);
        setSelectedEngName(data.engName);
        setSelectedAbbName(data.abbName);
        setSelectedCategoryId(data.categoryId);
        setIsDetailModalVisible(true);
    };


    const handleSearch = () => {
        const result = rowData.filter(item =>
            item.korName.includes(wordSearch) &&
            item.creator.includes(creatorSearch) &&
            item.modifier.includes(modifierSearch)
        );
        setFilteredData(result);
    };

    const handleReset = () => {
        setWordSearch('');
        setCreatorSearch('');
        setModifierSearch('');
        setFilteredData(rowData);
    };

    const handleDetailOk = () => {
        setIsDetailModalVisible(false);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };



    // TODO crud api function naming rename 통신 테스트용 IP
    /** Select */
    const fetchData = async () => {
        try {
            const serverIp = process.env.REACT_APP_LocalServer_IP;
            const response = await axios.get(`${serverIp}/api/terms/all`);

            // 필요한 데이터 구조에 맞게 변환
            const apiData = response.data.map((item) => ({
                termNo : item.termNo || "N/A",
                korName: item.korName || "N/A",  // korName이 없는 경우 "N/A"로 설정
                engName:  item.engName || "N/A",
                abbName:  item.abbName || "N/A",
                definition: item.definition || "N/A",  // definition을 definition으로 사용
                creator: item.creator || "Unknown", // creator 정보가 없다면 기본값
                createdDate: item.createdDate || new Date().toLocaleDateString(),
                modifier: item.modifier || "Unknown",
                modifiedDate: item.modifiedDate || new Date().toLocaleDateString(),
            }));

            setRowData(apiData);
            setFilteredData(apiData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }; //fetchData

    /** insert TODO : function 분리*/
    const handleAddModalOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    const serverIp = process.env.REACT_APP_LocalServer_IP;
                    const response = await axios.post(`${serverIp}/api/terms`, {
                        korName: values.korName,
                        engName: values.engName,
                        abbName: values.abbName,
                        definition: values.definition,
                        categoryId: 'A0001'
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.status === 201) {
                        message.success('단어가 성공적으로 등록되었습니다!');

                        // 신규 단어를 rowData에 추가하고 그리드를 갱신합니다.
                        const updatedData = [...rowData, response.data];
                        setRowData(updatedData);
                        setFilteredData(updatedData);

                        fetchData();

                        // 폼 초기화 및 모달 닫기
                        form.resetFields();
                        setIsAddModalVisible(false);
                    }
                } catch (error) {
                    message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
                    console.error('Error:', error);
                }
            })
            .catch((error) => {
                console.log('폼 검증 실패:', error);
            });
    }; //handleAddModalOk

    /* update */
    const handleUpdate = async () => {
        try {
            const serverIp = process.env.REACT_APP_LocalServer_IP;
            const response = await axios.patch(`${serverIp}/api/terms/${termNo}`, {
                korName: selectedkorName,
                engName: selectedEngName,
                abbName: selectedAbbName,
                definition: setSelectedDefinition,
                categoryId: 'A0005' // TOOD : TEST
            });

            if (response.status === 200) {
                message.success('단어가 성공적으로 수정되었습니다!');
                setIsDetailModalVisible(false);
                fetchData(); // 수정 후 최신 데이터 반영
            }
        } catch (error) {
            message.error('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('Error:', error);
        }
    }; //handleUpdate

    /** Delete */
    const handleDelete = async () => {
        Modal.confirm({
            title: '정말 삭제하시겠습니까?',
            content: '삭제된 단어는 복구할 수 없습니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk: async () => {
                try {
                    const serverIp = process.env.REACT_APP_LocalServer_IP;
                    // API를 통해 삭제 요청
                    const response = await axios.delete(`${serverIp}/api/terms/${selectedTerm}`);

                    if (response.status === 204) {
                        message.success('단어가 성공적으로 삭제되었습니다.');

                        // 삭제된 항목을 그리드에서 제거


                        fetchData(); // 수정 후 최신 데이터 반영


                        // 모달 닫기
                        setIsDetailModalVisible(false);
                    } else {
                        message.error('삭제 중 오류가 발생했습니다.');
                    }
                } catch (error) {
                    message.error('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
                    console.error('Error deleting term:', error);
                }
            }
        });
    }; //handleDelete


    const handleAddModalCancel = () => {
        form.resetFields();
        setIsAddModalVisible(false);
    };
    /** handle function End !!!!! */





    /** Render Start*/
    /** Render End*/

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <Title level={1} style={{ textAlign: 'center', marginBottom: '20px', color: '#1890ff' }}>
                    백과
                </Title>
                <Card title="검색폼" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label>단어명</label>
                            <Input
                                placeholder="단어명으로 검색하세요"
                                value={wordSearch}
                                onChange={(e) => setWordSearch(e.target.value)}
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <label>생성자</label>
                            <Input
                                placeholder="생성자로 검색하세요"
                                value={creatorSearch}
                                onChange={(e) => setCreatorSearch(e.target.value)}
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>수정자</label>
                            <Input
                                placeholder="수정자로 검색하세요"
                                value={modifierSearch}
                                onChange={(e) => setModifierSearch(e.target.value)}
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
                            검색
                        </Button>
                        <Button onClick={handleReset}>
                            초기화
                        </Button>
                    </div>
                </Card>

                <Card title="단어 목록">
                    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                            <Button
                                type="primary"
                                onClick={() => setIsAddModalVisible(true)}
                            >
                                신규 등록
                            </Button>
                        </div>
                        <AgGridReact
                            ref={gridRef}
                            rowData={filteredData}
                            columnDefs={columnDefs}
                            onRowDoubleClicked={handleRowDoubleClick}
                            pagination={true}
                            paginationPageSize={10}
                        />
                    </div>
                </Card>

                {/* 신규 등록 모달 */}
                <Modal
                    title="단어 신규 등록"
                    visible={isAddModalVisible}
                    onOk={handleAddModalOk}
                    onCancel={handleAddModalCancel}
                    footer={[
                        <Button key="back" onClick={handleAddModalCancel}>
                            취소
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleAddModalOk}>
                            저장
                        </Button>,
                    ]}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="korName"
                            label="단어명"
                            rules={[{ required: true, message: '단어명을 입력하세요!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="engName"
                            label="단어명(영문)"
                            rules={[{ required: true, message: '영문단어명을 입력하세요!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="abbName"
                            label="단어명(abb)"
                            rules={[{ required: true, message: '단어명(줄임)을 입력하세요!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="definition"
                            label="단어설명"
                            rules={[{ required: true, message: '단어설명을 입력하세요!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="단어 상세정보"
                    visible={isDetailModalVisible}
                    onOk={handleDetailOk}
                    onCancel={handleDetailCancel}
                    footer={[
                        <Button key="back" onClick={handleDetailCancel}>
                            취소
                        </Button>,
                        <Button key="edit" type="primary" onClick={handleUpdate}>
                            수정
                        </Button>,
                        <Button key="delete" type="danger" onClick={handleDelete}>
                            삭제
                        </Button>,
                    ]}
                >
                    <div style={{ marginBottom: '10px' }}>
                        <label>번호</label>
                        <Input value={termNo} readOnly placeholder="번호" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>단어명</label>
                        <Input
                            value={selectedkorName}
                            onChange={(e) => setSelectedkorName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>단어명(영문)</label>
                        <Input
                            value={selectedEngName}
                            onChange={(e) => setSelectedEngName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>단어명(abb)</label>
                        <Input
                            value={selectedAbbName}
                            onChange={(e) => setSelectedAbbName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>단어설명</label>
                        <Input.TextArea
                            value={selectedDefinition}
                            onChange={(e) => setSelectedDefinition(e.target.value)}
                            rows={4}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ApiTest;
