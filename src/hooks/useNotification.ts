import { SW_NOTIFICATIONS } from '@/constants/features'
import {
  getServiceWorkerRegistration,
  setupMessageListener,
} from '@/utils/serviceworker-helpers'
import _noop from 'lodash/noop'
import { useEffect } from 'react'

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

export const requestNotificationPermission = (
  cb?: (_permission: NotificationPermission) => void,
  onError: VoidFunction = _noop
) => {
  if (!SW_NOTIFICATIONS) {
    cb?.('denied')
    return
  }

  if (!('Notification' in window)) {
    alert('This browser does not support notification')
    return
  }

  try {
    Notification.requestPermission(cb)
  } catch {
    onError()
  }
}

export const _getNotifications = async (filter: GetNotificationOptions) => {
  const sw = await getServiceWorkerRegistration()
  if (!sw) return

  const notifications = await sw.getNotifications(filter)

  return notifications
}

export const _setNotification = async (
  title: string = 'wheatifully',
  options: NotificationOptions = {}
) => {
  const sw = await getServiceWorkerRegistration()

  if (!sw) return

  console.log('setting notification', title, options)
  requestNotificationPermission(
    (result) => {
      if (result === 'granted') {
        sw.showNotification(title, {
          body: 'bread coach',
          ...config,
          ...options,
        })
      }
    },
    () => {
      alert('This browser does not support notifications')
    }
  )

  const notifs = await sw.getNotifications()

  return notifs.find((notification) => notification.tag === options.tag)
}

export const useNotification = () => {
  useEffect(() => {
    // requestNotificationPermission()
    setupMessageListener()
  }, [])

  return {
    // setNotification,
    // getNotifications,
    requestPermission: requestNotificationPermission,
  }
}

export default useNotification
