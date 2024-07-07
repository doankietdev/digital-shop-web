import { useCallback, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '~/utils/icons'

/**
 * @returns {[toggleIcon, inputType]}
 */
function usePasswordToggle() {
  const [visible, setVisible] = useState(false)

  const handleIconClick = useCallback(() => setVisible((visible) => !visible), [])

  const toggleIcon = visible ? (
    <EyeSlashIcon onClick={handleIconClick} />
  ) : (
    <EyeIcon onClick={handleIconClick} />
  )

  const inputType = visible ? 'text' : 'password'

  return [toggleIcon, inputType]
}

export default usePasswordToggle
