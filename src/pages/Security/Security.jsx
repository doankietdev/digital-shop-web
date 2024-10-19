import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, DocumentTitle } from '~/components'
import sessionService from '~/services/sessionService'
import { convertMsToHumanizeTime } from '~/utils/formatter'

function Security() {
  const [loginSessions, setLoginSessions] = useState([])

  useEffect(() => {
    const fetchLoginSessions = async () => {
      const loginSessions = await sessionService.getLoginSessionForCurrent()
      setLoginSessions(loginSessions)
    }
    fetchLoginSessions()
  }, [])

  const handleLogoutClick = useCallback(async (loginSessionId) => {
    const loadingToast = toast.loading('Logging out session')
    try {
      await sessionService.logoutSessionForCurrent({ loginSessionId })
      const loginSessions = await sessionService.getLoginSessionForCurrent()
      setLoginSessions(loginSessions)
      toast.success('Logout session successfully')
    } catch (error) {
      toast.error(error.messages)
    } finally {
      toast.dismiss(loadingToast)
    }
  }, [])

  return (
    <>
      <DocumentTitle title='Security' />
      <div className='flex justify-center'>
        <div className='max-w-[800px] w-full'>
          <h2 className='font-medium text-[18px] text-center'>Security Dashboard</h2>
          <ul className="mt-7">
            {loginSessions.map((session) => {
              const { _id, ip, browser, device, os, updatedAt } = session || {}
              return (
                <li
                  key={_id}
                  className="py-[20px] border-t flex flex-col md:flex-row md:justify-between md:items-center gap-[12px]"
                >
                  <div className="flex flex-col items-start gap-2">
                    <p className='flex gap-3'>
                      <span>{device?.name ? device.name : 'Unknown device'}</span>
                      <span>-</span>
                      <span>{os.name ? os.name : 'Unknown operating system'}</span>
                      {browser.name && (
                        <><span>-</span><span>{browser.name}</span></>
                      )}
                    </p>
                    <p>
                      {ip}
                    </p>
                    <p className='text-black/80 text-[14px]'>
                      {convertMsToHumanizeTime(updatedAt)}
                    </p>
                  </div>

                  <div className='flex flex-col md:flex-row gap-[14px] md:gap-[8px]'>
                    <Button
                      outlined
                      rounded
                      className='!px-[22px] !py-[8px] !text-[12px]'
                      onClick={() => handleLogoutClick(_id)}
                      // disabled={disabled}
                    >
                        Logout
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Security
