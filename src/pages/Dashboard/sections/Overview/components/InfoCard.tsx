import { Col, Card, Skeleton } from 'antd';
import React from 'react';

interface InfoCardProps {
  title: string,
  quantity?: number,
  loading: boolean
}

const InfoCard: React.FC<InfoCardProps> = ({title, quantity, loading}) => {
  return (
    <Col span={6}>
        <Card className="card">
            <Skeleton className="skeleton" paragraph={{rows: 2}} active loading={loading}/>
            {!loading && (
              <>
                <strong className="cardTitle">{title}</strong>
                <p className="cardText">{quantity}</p>
              </>
            )}
        </Card>
    </Col>
  );
}

export default InfoCard;