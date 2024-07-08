import { useCallback, useRef } from 'react'
import Button from '../Button'

function FileField({
  children,
  primary,
  outlined,
  rounded,
  icon,
  disabled = false,
  onFileChange,
  accept
}) {
  const inputRef= useRef()

  const handleButtonClick = useCallback(() => {
    inputRef.current.click()
  }, [])

  const handleInputChange = useCallback(() => {
    onFileChange(inputRef.current.files)
  }, [onFileChange])

  return (
    <div>
      <input
        type="file"
        accept={accept}
        className='hidden'
        ref={inputRef}
        onChange={handleInputChange}
      />
      <Button
        primary={primary}
        outlined={outlined}
        rounded={rounded}
        icon={icon}
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {children}
      </Button>
    </div>
  )
}

export default FileField
