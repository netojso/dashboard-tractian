import React, { useEffect, useState } from 'react';
import '../../styles.css';

import { UploadOutlined } from '@ant-design/icons';
import { Row, Col, Modal, Form, Input, Upload, Button, Slider, Select, InputNumber, DatePicker, message, notification } from 'antd';

import api from '../../../../../../services/api';
import { Asset } from '../../../../../../@types/asset';

interface NewItemModalProps {
  openNewItemModal: boolean;
  toggleModal: (value: boolean) => void;
  selectedTableRow?: React.Key,
  selectUnits?: {
    value: number,
    display: string
  }[],
  selectCompanies?: {
    value: number,
    display: string
  }[]
}

const NewItemModal: React.FC<NewItemModalProps> = ({
  openNewItemModal,
  toggleModal,
  selectedTableRow,
  selectCompanies,
  selectUnits}) => {

  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<Asset>();
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

  const openNotification = (message: string, description: string) => {
    notification.success({
      message,
      description,
    });
  };

  async function postData(values: any){
    try {
      await api.post("/assets", { values })

      form.resetFields();

      toggleModal(false);

      openNotification("Ativo cadastrado", "Seu ativo foi enviado com sucesso.");

    } catch (error) {

    }
  }

  useEffect(() => {
    async function loadInitialValues() {
      const {data} = await api.get<Asset>(`/assets/${selectedTableRow}`);

      if(data) setInitialValues(data);
    }

      if(selectedTableRow) loadInitialValues()
  }, [selectedTableRow])

  return (
      <Modal
          className="newItemModal"
          visible={openNewItemModal}
          afterClose={() => {
            form.resetFields();
            setInitialValues({})
          }}
          title="Novo item"
          onOk={() => {
            form.
            validateFields()
            .then(values => postData(values))
            //setInitialValues({})
          }}
          onCancel={() => {
            toggleModal(false)
            setInitialValues({})
          }}
          okText="Adicionar"
          cancelText="Cancelar"
        >
          <Form initialValues={initialValues} form={form} name="form_newItem">
          <strong >Geral</strong>
            <Row gutter={24} >
              <Col span={12} className="formColumnModal">
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true, message: 'Insira o nome do ativo!' }]}
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
              <Col span={12} className="formColumnModal">
                <Form.Item name="healthscore" label="Saúde">
                  <Slider />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="status"
                label="Status">
                  <Select>
                    <Select.Option value="inAlert">Em alerta</Select.Option>
                    <Select.Option value="inOperation">Em operação</Select.Option>
                    <Select.Option value="inDowntime">Em parada</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className="formColumnModal">
                <Form.Item
                name="sensors"
                label="Sensores instalados"
                rules={[{ required: true, message: 'Selecione um sensor', type: 'array' }]}
                >
                  <Select mode="multiple" placeholder="Selecione alguns sensores" style={{minWidth: 200}}>
                    <Select.Option value="GSJ1535">GSJ1535</Select.Option>
                    <Select.Option value="IBS1636">IBS1636</Select.Option>
                    <Select.Option value="JVC1134">JVC1134</Select.Option>
                    <Select.Option value="LZY5230">LZY5230</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item
                name="unit"
                label="Unidade">
                  <Select>
                    {selectUnits?.map(unit => (
                      <Select.Option key={unit.value} value={unit.value}>{unit.display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item
                name="company"
                label="Empresa">
                  <Select>
                    {selectCompanies?.map(company => (
                      <Select.Option key={company.value} value={company.value}>{company.display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <strong>Especificações</strong>
            <Row gutter={24} title="Especificações" className="specificationsRow">
              <Col span={8}>
                <Form.Item
                  name="specifications.maxTemp"
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
