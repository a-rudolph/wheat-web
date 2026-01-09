import { Col, Row } from 'antd'
import { Text } from '@/components/atoms'

const CardTitle: React.FC<{
  children?: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, style }) => {
  return (
    <Row style={{ margin: '16px', ...style }}>
      <Col>
        <Text
          fs='h5'
          color='text_2'
          style={{
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {children}
        </Text>
      </Col>
    </Row>
  )
}

export default CardTitle
