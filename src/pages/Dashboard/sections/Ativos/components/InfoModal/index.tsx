import React from 'react';
import '../../styles.css';

import { EditOutlined } from '@ant-design/icons';
import { Row, Col, Carousel, Card, Tag, Tree } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Modal from 'antd/lib/modal/Modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Asset } from '../../../../../../@types/asset';
import translateStatus from '../../../../../../utils/translateStatus';

interface InfoModalProps {
  asset?: Asset,
  openInfoModal: boolean;
  toggleModal: (value: boolean) => void;
}

const modelOptions: Highcharts.Options = {
  chart: {
      type: 'chart',
      height: '70%',
  },

  title: {
      text: 'Saúde (%)',
      style: {
          fontSize: '24px'
      }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'none',
    shadow: false,
    style: {
        fontSize: '16px'
    },
    valueSuffix: '%',
    pointFormat: '<span style="opacity: 1; transform: translate(263px, 218px); visibility: visible; font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
    positioner: function(labelWidth) {
      return {
        x: (this.chart.chartWidth - labelWidth) / 2,
        y: (this.chart.plotHeight / 2) + 40
      }
    }
  },
  pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: "rgba(124, 181, 236, 0.3)",
          borderWidth: 0
      }]
  },
  yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
      }
  }
};

const InfoModal: React.FC<InfoModalProps> = ({openInfoModal, toggleModal, asset}) => {

  const options = Object.assign(modelOptions, {
    series: [{
      type: 'solidgauge',
      name: 'Move',
      data: [{
          color: Number(asset?.healthscore?.toString) < 50 ? '#ff0000' : '#00ba2b',
          radius: '112%',
          innerRadius: '88%',
          y: asset?.healthscore
      }]
  }]
  })

  const specifications = [{
    title: 'Especificações',
    key: '1',
    children: [
      {
        title: `Temp. Máxima: ${asset?.specifications?.maxTemp || 0}°C`,
        render: (text: string) => <strong>{text}</strong>,
        key: '2',
      },
      {
        title: `Potência: ${asset?.specifications?.power || 0}W`,
        key: '3',
      },
      {
        title: `RPM: ${asset?.specifications?.rpm || 0}`,
        key: '4',
      },

    ]
  }]

  const metrics = [{
    title: 'Métricas',
    key: '1',
    children: [
      {
        title: `Total de coletas: ${asset?.metrics?.totalCollectsUptime}`,
        render: (text: string) => <strong>{text}</strong>,
        key: '2',
      },
      {
        title: `Horas coletadads: ${asset?.metrics?.totalUptime?.toFixed(2)}h`,
        key: '3',
      },
      {
        title: `Última coleta: ${asset?.metrics?.lastUptimeAt && new Date(asset?.metrics?.lastUptimeAt).toLocaleDateString()}`,
        key: '4',
      },

    ]
  }]

  return (
    <Modal
      width="80%"
      visible={openInfoModal}
      centered
      title="Informações"
      onOk={() => toggleModal(false) }
      onCancel={() => toggleModal(false) }
      footer={[
        <div/>,
        <div/>,
      ]}
    >
    <Row>
      <Col span={14}>
        <Carousel autoplay>
          <HighchartsReact
              highcharts={Highcharts}
              options={options}
          />
        </Carousel>
      </Col>

      <Col span={8} className="infoModalColumn">
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="imageAsset"
            src={asset?.image}
          />
        }
        actions={[
          <EditOutlined key="edit" />,
        ]}
      >
        <Meta
          title={[
            <strong>{asset?.name}</strong>,
            <Tag
              color={translateStatus(asset?.status)?.color}
              className="infoModalTag">{translateStatus(asset?.status)?.status}</Tag>
          ]}
          description={[
              <p><strong>Saúde:</strong> {asset?.healthscore + '%'}</p>,
              <Tree
                focusable={false}
                selectable={false}
                draggable={false}
                style={{background:'#fff'}}
                onSelect={(i) => console.log(i) }
                treeData={specifications}
              />,
              <Tree
                  focusable={false}
                  selectable={false}
                  draggable={false}
                  style={{background:'#fff', display: 'block'}}
                  onSelect={(i) => console.log(i) }
                  treeData={metrics}
              />,
            ]
          }
        />
      </Card>
      </Col>
    </Row>
  </Modal>
  );
}

export default InfoModal;
