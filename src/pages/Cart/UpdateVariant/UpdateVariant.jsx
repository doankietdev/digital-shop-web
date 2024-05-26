/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import { Dropdown } from '~/components/Dropdowns'

function UpdateVariant(
  { title, variants, defaultVariantId, disabled = false, onChange = () => {} },
  ref
) {
  const [prevSelectedValue, setPrevSelectedValue] = useState(null)
  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariantId || variants[0]?._id
  )

  useImperativeHandle(
    ref,
    () => ({
      rollback() {
        if (prevSelectedValue) {
          setSelectedVariantId(prevSelectedValue)
        }
      }
    }),
    [prevSelectedValue]
  )

  const handleClick = useCallback(
    (variantId) => {
      if (disabled) return
      setSelectedVariantId((prevSelectedVariantId) => {
        if (prevSelectedVariantId === variantId) {
          return prevSelectedVariantId
        }
        setPrevSelectedValue(prevSelectedVariantId)
        onChange(variantId)
        return variantId
      })
    },
    [disabled, onChange]
  )

  return (
    <Dropdown
      label={title}
      className="px-2 py-1 w-fit bg-[#F3F4F6] border rounded-lg"
      dropdownContainerClassName="left-0 bg-white p-4 w-[360px]"
      itemContainerClassName="flex gap-2 items-center flex-wrap"
    >
      {variants?.map((variant, index) => (
        <span
          onClick={() => handleClick(variant._id)}
          key={index}
          className={clsx(
            'bg-[#F3F4F6] p-2 rounded flex justify-center items-center border border-[#F3F4F6] select-none',
            {
              ' !border-primary-400 !bg-primary-400 !bg-opacity-10':
                selectedVariantId === variant._id,
              'cursor-pointer': !disabled,
              'cursor-not-allowed opacity-70': disabled
            }
          )}
        >
          {variant.name}
        </span>
      ))}
    </Dropdown>
  )
}

export default memo(forwardRef(UpdateVariant))
