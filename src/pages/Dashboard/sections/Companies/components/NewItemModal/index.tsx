import React from 'react';
import '../../../../../../App.css';
import { Row, Col, Modal, Form, Input } from 'antd';

interface NewItemModalProps {
  openNewItemModal: boolean;
  toggleModal: (value: boolean) => void;
}

const NewItemModal: React.FC<NewItemModalProps> = ({openNewItemModal, toggleModal}) => {

  return (
    <Modal
      className="newItemModal"
      visible={openNewItemModal}
      centered
      title="Novo item"
      onOk={() => toggleModal(false)}
      onCancel={() => toggleModal(false)}
      okText="Adicionar"
      cancelText="Cancelar"
    >
      <Form name="validate_other">
      <strong>Geral</strong>
        <Row gutter={24} >
          <Col span={24}>
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true, message: 'Insira o nome da empresa!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default NewItemModal;
