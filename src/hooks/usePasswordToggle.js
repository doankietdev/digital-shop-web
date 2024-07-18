import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '~/utils/icons'

/**
 * @returns {[toggleIcon, inputType]}
 */
function usePasswordToggle() {
  const [visible, setVisible] = useState(false)
  const ToggleIcon = visible ? EyeSlashIcon : EyeIcon
  const inputType = visible ? 'text' : 'password'

  return [ToggleIcon, inputType, setVisible]
}

export default usePasswordToggle
