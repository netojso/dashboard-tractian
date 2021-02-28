import React from 'react';
import { Row, Col, Modal, Form, Input, Select } from 'antd';

interface NewItemModalProps {
  openNewItemModal: boolean;
  toggleModal: (value: boolean) => void;
  selectCompanies?: {
    value: number,
    display: string
  }[]
}

const NewItemModal: React.FC<NewItemModalProps> = ({openNewItemModal, toggleModal, selectCompanies}) => {

  return (
    <Modal
    style={{minWidth: 700, padding: "0px 40px"}}
    centered
    visible={openNewItemModal}
    title="Novo item"
    onOk={() => toggleModal(false)}
    onCancel={() => toggleModal(false)}
    okText="Adicionar"
    cancelText="Cancelar"
  >
    <Form name="validate_other">
    <strong>Geral</strong>
      <Row gutter={24} >
        <Col span={12}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
        <Form.Item
          name="company"
          label="Empresa">
            <Select onChange={(e) => console.log(e)}>
              {selectCompanies?.map(company => (
                <Select.Option key={company.value} value={company.value}>{company.display}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
  );
}

export default NewItemModal;
