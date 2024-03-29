import { useRef, useState } from 'react'
import { Card } from '@/components/atoms'
import { getColor } from '@/styles/themes'
import { requestNotificationPermission } from '@/hooks/useNotification'
import SetTimeModal from '@/components/SetTimeModal'
import styled from 'styled-components'
import TimeDisplay from '@/components/TimeDisplay'
import { useTimer } from '@/hooks/useTimer'

const StyledCard = styled(Card)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  text-align: start;

  padding: 16px;
  width: 168px;

  .time-container {
    border-bottom: 1px dashed ${getColor('text_1')};
  }
`

export default function TimeCard() {
  const hmRef = useRef<HTMLSpanElement | null>(null)
  const ssRef = useRef<HTMLSpanElement | null>(null)

  const setTimeDisplay = ({ hh, mm, ss }: TimeValue) => {
    if (!hmRef.current || !ssRef.current) return

    hmRef.current.innerText = `${hh}:${mm}`
    ssRef.current.innerText = `:${ss}`
  }

  const { startTimer } = useTimer(setTimeDisplay)

  const [visible, setVisible] = useState(false)

  const onDone = (value: Required<TimeValue>) => {
    requestNotificationPermission((permission) => {
      if (permission !== 'granted') {
        alert(
          'you must grant permission in order to be notified when a timer finishes'
        )
      }
      startTimer(value)
      setVisible(false)
    })
  }

  return (
    <StyledCard>
      <SetTimeModal
        visible={visible}
        onClose={() => setVisible(false)}
        onDone={onDone}
      />
      <TimeDisplay hmRef={hmRef} ssRef={ssRef} />
    </StyledCard>
  )
}
