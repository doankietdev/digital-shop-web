import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BouceLoading, Button, DocumentTitle, Mark } from '~/components'
import sessionService from '~/services/sessionService'
import { getHumanizedDurationFromNow } from '~/utils/formatter'

function Security() {
  const [loginSessions, setLoginSessions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabledLogout, setIsDisabledLogout] = useState(false)

  useEffect(() => {
    const fetchLoginSessions = async () => {
      setIsLoading(true)
      const loginSessions = await sessionService.getLoginSessionsForCurrent()
      setLoginSessions(loginSessions)
      setIsLoading(false)
    }
    fetchLoginSessions()
  }, [])

  const handleLogoutClick = useCallback(async (loginSessionId) => {
    setIsDisabledLogout(true)
    const loadingToast = toast.loading('Logging out session')
    try {
      await sessionService.logoutSessionForCurrent({ loginSessionId })
      const loginSessions = await sessionService.getLoginSessionsForCurrent()
      setLoginSessions(loginSessions)
      toast.success('Logout session successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
      setIsDisabledLogout(false)
    }
  }, [])

  const handleLogoutAllSessionsClick = useCallback(async () => {
    setIsDisabledLogout(true)
    const loadingToast = toast.loading('Logging out of all login sessions')
    try {
      await sessionService.logoutAllSessionsForCurrent()
      const loginSessions = await sessionService.getLoginSessionsForCurrent()
      setLoginSessions(loginSessions)
      toast.success('Log out of all login sessions successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.dismiss(loadingToast)
      setIsDisabledLogout(false)
    }
  }, [])

  return (
    <>
      <DocumentTitle title="Security" />
      <div className="flex justify-center">
        <div className="max-w-[800px] w-full">
          <h2 className="font-medium text-[18px] text-center">Security Dashboard</h2>
          {isLoading ? (
            <div className="mt-7 flex justify-center">
              <BouceLoading className="w-[8px] h-[8px] !mx-[5px] bg-primary-400" />
            </div>
          ) : (
            <>
              <ul className="mt-7">
                {loginSessions.map((session) => {
                  const { _id, ip, browser, device, os, updatedAt, isCurrent } = session || {}
                  return (
                    <li
                      key={_id}
                      className="border-t border-b py-[20px] flex flex-col md:flex-row md:justify-between md:items-center gap-[12px]"
                    >
                      <div className="flex flex-col items-start gap-2">
                        <p className="flex gap-3">
                          <span>{device?.name ? device.name : 'Unknown device'}</span>
                          <span>-</span>
                          <span>{os.name ? os.name : 'Unknown operating system'}</span>
                          {browser.name && (
                            <>
                              <span>-</span>
                              <span>{browser.name}</span>
                            </>
                          )}
                        </p>
                        <p>{ip}</p>
                        {isCurrent && <Mark>Current login session</Mark>}
                        <p className="text-black/80 text-[14px]">
                          {getHumanizedDurationFromNow(updatedAt)}
                        </p>
                      </div>

                      {!isCurrent && (
                        <div className="flex flex-col md:flex-row gap-[14px] md:gap-[8px]">
                          <Button
                            outlined
                            rounded
                            className="!px-[22px] !py-[8px] !text-[12px]"
                            onClick={() => handleLogoutClick(_id)}
                            disabled={isDisabledLogout}
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
              <div className="mt-7 flex justify-center">
                <Button
                  primary
                  outlined
                  rounded
                  className="!px-[22px] !py-[8px]"
                  onClick={() => handleLogoutAllSessionsClick()}
                  disabled={isDisabledLogout}
                >
                  Log out of all login sessions
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Security
