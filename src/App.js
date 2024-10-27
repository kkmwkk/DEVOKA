import React, { useState } from 'react';
import { Card, Input, Button, Modal } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Typography } from 'antd';

const { Title } = Typography;

const App = () => {
  const [wordSearch, setWordSearch] = useState('');
  const [creatorSearch, setCreatorSearch] = useState('');
  const [modifierSearch, setModifierSearch] = useState('');
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedWordName, setSelectedWordName] = useState('');
  const [selectedWordDescription, setSelectedWordDescription] = useState('');

  const columnDefs = [
    { headerName: '단어명', field: 'wordName' },
    { headerName: '단어설명', field: 'wordDescription', flex: 1 },
    { headerName: '생성자', field: 'creator' },
    { headerName: '생성일자', field: 'createdDate' },
    { headerName: '수정자', field: 'modifier' },
    { headerName: '수정일자', field: 'modifiedDate' },
  ];

  const handleRowDoubleClick = (event) => {
    const { data } = event;
    setSelectedWordName(data.wordName);
    setSelectedWordDescription(data.wordDescription);
    setIsDetailModalVisible(true);
  };

  const handleSearch = () => {
    const result = rowData.filter(item =>
        item.wordName.includes(wordSearch) &&
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

  // 더미 데이터 생성 (예시)
  const generateDummyData = () => {
    const dummyData = Array.from({ length: 30 }, (_, index) => ({
      wordName: `단어${index + 1}`,
      wordDescription: `설명${index + 1}`,
      creator: `생성자${index + 1}`,
      createdDate: new Date().toLocaleDateString(),
      modifier: `수정자${index + 1}`,
      modifiedDate: new Date().toLocaleDateString(),
    }));
    setRowData(dummyData);
    setFilteredData(dummyData);
  };

  React.useEffect(() => {
    generateDummyData();
  }, []);

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
              <AgGridReact
                  rowData={filteredData}
                  columnDefs={columnDefs}
                  onRowDoubleClicked={handleRowDoubleClick}
                  pagination={true}
                  paginationPageSize={10}
              />
            </div>
          </Card>

          <Modal
              title="단어 상세정보"
              open={isDetailModalVisible}
              onOk={handleDetailOk}
              onCancel={handleDetailCancel}
              footer={[
                <Button key="back" onClick={handleDetailCancel}>
                  취소
                </Button>,
                <Button key="submit" type="primary" onClick={handleDetailOk}>
                  확인
                </Button>,
              ]}
          >
            <div style={{ marginBottom: '10px' }}>
              <label>단어명</label>
              <Input
                  value={selectedWordName}
                  readOnly
                  placeholder="단어명"
              />
            </div>
            <div>
              <label>단어설명</label>
              <textarea
                  value={selectedWordDescription}
                  readOnly
                  style={{ width: '100%', height: '100px', marginTop: '5px' }}
              />
            </div>
          </Modal>
        </div>
      </div>
  );
};

export default App;
