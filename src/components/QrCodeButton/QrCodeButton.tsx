import { Button, Col, Dropdown, Row } from 'antd'
import styled, { useTheme } from 'styled-components'
import QRCode from 'qrcode'
import { QrcodeOutlined } from '@ant-design/icons'

const CANVAS_ID = 'qr-canvas-id'

const StyledCanvas = styled.canvas`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_1};
  box-shadow: ${({ theme }) => theme.shadows.small};
  background: ${({ theme }) => theme.colors.primary_1};
`

type QrCodeButtonProps = {
  value?: string
}

const QrCodeButton = ({ value }: QrCodeButtonProps) => {
  const theme = useTheme()

  const onVisibleChange = (isVisible: boolean) => {
    if (!isVisible) return

    const url = value || location.href
    const canvas = document.getElementById(CANVAS_ID)

    QRCode.toCanvas(canvas, url, {
      width: 300,
      color: {
        dark: theme.colors.wheaty_1,
        light: theme.colors.primary_1,
      },
    })
  }

  return (
    <Dropdown
      forceRender={true}
      onOpenChange={onVisibleChange}
      trigger={['click']}
      overlay={<StyledCanvas id={CANVAS_ID} data-testid='qr-canvas' />}
    >
      <Button ghost>
        <Row gutter={8}>
          <Col>
            <QrcodeOutlined />
          </Col>
          <Col>open on mobile</Col>
        </Row>
      </Button>
    </Dropdown>
  )
}

export default QrCodeButton
