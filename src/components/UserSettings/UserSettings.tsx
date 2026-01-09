import { CardTitle, Text } from '@/components/atoms'
import { Button, Checkbox, Form, Slider, Space, Table } from 'antd'
import { BasicLayout } from '@/layouts'
import DayNight from '@/components/DayNight'
import moment from 'moment'
import styled from 'styled-components'
import { useUserSettingsStore } from '@/stores/user-settings'
import { ReloadOutlined } from '@ant-design/icons'

const StyledDiv = styled.div`
  padding: 16px;
  padding-top: 0;
`

const MAX_MINUTES = 24 * 60

const UserSettings: React.FC = () => {
  const { settings, tooltips, updateSettings, resetTips } =
    useUserSettingsStore()

  const getTime = (minutes: number) => {
    return moment().startOf('day').add(minutes, 'minutes')
  }

  const formatTime = (time: moment.Moment) => {
    return time.format('h:mm a')
  }

  const start = getTime(settings.activeTimeStart)
  const end = getTime(settings.activeTimeEnd)

  return (
    <BasicLayout.Card>
      <CardTitle>Settings</CardTitle>
      <StyledDiv>
        <Form>
          <Text fs='h5'>Active time</Text>
          <Form.Item name='activeTime'>
            <Space>
              <DayNight showSleep={false} time={start} />
              <Text fs='body' secondary>
                {formatTime(start)}
              </Text>
              <Text fs='body' secondary>
                -
              </Text>
              <DayNight showSleep={false} time={end} />
              <Text fs='body' secondary>
                {formatTime(end)}
              </Text>
            </Space>
            <Slider
              range
              max={MAX_MINUTES}
              value={[settings.activeTimeStart, settings.activeTimeEnd]}
              step={15}
              onChange={(value) => {
                updateSettings({
                  activeTimeStart: value[0],
                  activeTimeEnd: value[1],
                })
              }}
              tooltip={{
                open: false,
              }}
            />
          </Form.Item>
          <Text fs='h5'>Timer</Text>
          <Form.Item name='showTimer'>
            <Checkbox
              checked={settings.showTimer}
              onChange={(e) => {
                updateSettings({
                  showTimer: e.target.checked,
                })
              }}
            >
              Show timer (beta)
            </Checkbox>
          </Form.Item>
          <div>
            <Text fs='h5'>Help</Text>
          </div>
          <Table
            dataSource={Object.entries(tooltips).map(([key, value]) => ({
              key,
              value,
            }))}
            pagination={false}
            bordered={true}
            columns={[
              {
                title: <Text fs='h5'>Tooltips</Text>,
                dataIndex: 'key',
                key: 'key',
              },
              {
                title: (
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={resetTips}
                    ghost
                  >
                    Reset tooltips
                  </Button>
                ),
                dataIndex: 'value',
                key: 'value',
                render: (value) => (value ? 'Ready' : 'Dismissed'),
              },
            ]}
          />
        </Form>
      </StyledDiv>
    </BasicLayout.Card>
  )
}

export default UserSettings
