import React from 'react';
import '../../../../../../App.css';
import { Row, Col, Modal, Form, Input, Select } from 'antd';

interface NewItemModalProps {
  openNewItemModal: boolean;
  toggleModal: (value: boolean) => void;
  selectUnits?: {
    value: number,
    display: string
  }[],
  selectCompanies?: {
    value: number,
    display: string
  }[]
}

const NewItemModal: React.FC<NewItemModalProps> = ({openNewItemModal, toggleModal, selectCompanies, selectUnits}) => {

  return (
    <Modal
    className="newItemModal"
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
            rules={[{ required: true, message: 'Insira o nome do usuário' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ required: true, message: 'Insira o e-mail do usuário' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
        <Form.Item
          name="unit"
          label="Unidade">
            <Select onChange={(e) => console.log(e)}>
              {selectUnits?.map(unit => (
                <Select.Option key={unit.value} value={unit.value}>{unit.display}</Select.Option>
              ))}
            </Select>
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
