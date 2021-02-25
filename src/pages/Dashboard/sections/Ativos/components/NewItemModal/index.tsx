import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col, Modal, Form, Input, Upload, Button, Slider, Select, InputNumber, DatePicker, message } from 'antd';

interface NewItemModalProps {
  openNewItemModal: boolean;
  toggleModal: (value: boolean) => void;
}


const Uploader = () => {
  const [fileList, updateFileList] = useState([]);
  const props = {
    fileList,
    beforeUpload: (file: any) => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return false;
    },
    onChange: (info: any) => {

      // To show the file without error symbol
      info.fileList[0].status = "sucess";

      updateFileList(info.fileList.filter((file: any) => file.status));

    }
   
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
    </Upload>
  );
};

const NewItemModal: React.FC<NewItemModalProps> = ({openNewItemModal, toggleModal}) => {
  const [form] = Form.useForm();
  const [fileList, updateFileList] = useState([]);
  const props = {
    fileList,
    beforeUpload: (file: any) => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return false;
    },
    onChange: (info: any) => {

      // To show the file without error symbol
      info.fileList[0].status = "sucess";

      updateFileList(info.fileList.filter((file: any) => file.status));

    }
   
  };

  return (
    <Modal
          style={{minWidth:800, padding: "0px 100px", top: 10}}
          visible={openNewItemModal}
          title="Novo item"
          onOk={() => {
            console.log("entrou", form.getFieldsValue())
            form.validateFields().then(values => console.log('teste', values))
          }}
          onCancel={() => toggleModal(false)}
          okText="Adicionar"
          cancelText="Cancelar"
        >
          <Form form={form} name="form_newItem" onFinish={(values) => console.log(values)}>
          <strong >Geral</strong>
            <Row gutter={24} >
              <Col span={12} style={{marginBottom: 20}}>
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
                name="upload"
                label="Upload"
                valuePropName= "fileList"
                getValueFromEvent={(e: any) => {
                  console.log('Upload event:', e);
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload png only</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12} style={{marginBottom: 20}}>
                <Form.Item name="heathly" label="Saúde">
                  <Slider />
                </Form.Item>   
              </Col>
              <Col span={12}>
              <Form.Item
                name="status"
                label="Status">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} style={{marginBottom: 20}}>
                <Form.Item
                name="sensors"
                label="Sensores instalados"
                rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                >
                  <Select mode="multiple" placeholder="Please select favourite colors" style={{minWidth: 200}}>
                    <Select.Option value="red">Red</Select.Option>
                    <Select.Option value="green">Green</Select.Option>
                    <Select.Option value="blue">Blue</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item
                name="unit"
                label="Unidade">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item
                name="company"
                label="Empresa">
                  <Select defaultValue="inAlert" onChange={(e) => console.log(e)}>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <strong>Especificações</strong>
            <Row gutter={24} title="Especificações" style={{marginTop: 20, fontSize: 40, color: "#000"}}>
              <Col span={8}>
                <Form.Item
                  name="maxTemp"
                  label="Temp. Máx. (ºC)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="power"
                  label="Potência (kWh)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="rpm"
                  label="Rotação (RPM)">
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
            </Row>

            <strong>Métricas</strong>
            <Row gutter={24} title="Métricas">
              <Col span={8}>
                <Form.Item
                  name="totalCollectsUptime"
                  label="Total de Coletas">
                    <InputNumber min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="totalUptime"
                  label="Total de Horas (h)">
                    <InputNumber min={0} step={0.1} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="lastUptimeAt"
                  label="Data da Última Coleta">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>      
          </Form>    
        </Modal>
  );
}

export default NewItemModal;