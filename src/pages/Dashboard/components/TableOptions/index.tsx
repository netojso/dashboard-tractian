import React from 'react';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Row, Col, Button, Modal } from 'antd';

import './styles.css';
import api from '../../../../services/api';
interface TableOptionsProps {
  selectedTableRows: React.Key[],
  openModal: (value: boolean) => void;
}

const TableOptions: React.FC<TableOptionsProps> = ({openModal, selectedTableRows}) => {

  async function deleteData() {
    Modal.confirm({
      title: 'Confirmação',
      icon: <ExclamationCircleOutlined color="blue"/>,
      content: "Tem certeza que deseja excluir estes ativos?",
      okText: "Deletar",
      cancelText: "Cancelar",
      onOk: () => {
        selectedTableRows.forEach(async row => {
          await api.delete(`/assets/${row}`)
        })
      }
    })
  }

  return (
    <Row className="row">
      <Col span={6} offset={0}>
        <Button
        className="button"
        onClick={() => {deleteData()}}
        disabled={selectedTableRows.length <= 0}
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />} />

        <Button
        className="button"
        onClick={() => openModal(true)}
        disabled={selectedTableRows.length > 1 || selectedTableRows.length === 0}
        type="primary"
        shape="circle"
        icon={<EditOutlined />} />

        <Button
        className="button"
        onClick={() => openModal(true)}
        disabled={selectedTableRows.length > 0}
        type="primary"
        shape="circle"
        icon={<PlusCircleOutlined />} />
      </Col>
  </Row>
  );
}

export default TableOptions;
