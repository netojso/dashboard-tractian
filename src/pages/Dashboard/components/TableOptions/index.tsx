import React from 'react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';

// import { Container } from './styles';

interface TableOptionsProps {
  openModal: (value: boolean) => void;
}

const TableOptions: React.FC<TableOptionsProps> = ({openModal}) => {
  return (
    <Row style={{marginBottom: 20}}>
      <Col span={6} offset={0}>
        <Button
        style={{marginRight: 10}}
        onClick={() => {}}
        type="primary"
        shape="circle"
        icon={<DeleteOutlined style={{fontSize: 20, color: '#fff'}} />} />

        <Button
        style={{marginRight: 10}}
        onClick={() => openModal(true)}
        type="primary"
        shape="circle"
        icon={<EditOutlined style={{fontSize: 20, color: '#fff'}} />} />

        <Button
        style={{marginRight: 10}}
        onClick={() => openModal(true)}
        type="primary"
        shape="circle"
        icon={<PlusCircleOutlined style={{fontSize: 20, color: '#fff'}} />} />
      </Col>
  </Row>
  );
}

export default TableOptions;
