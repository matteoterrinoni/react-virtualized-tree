import { CheckboxStatus as Status } from 'src/model'

export { CheckboxStatus as Status } from 'src/model'

export type Props = {
  onChange?: any
  checked?: boolean
  status?: Status
  className?: string
  disabled?: boolean
}

const C = {
  classNames: {
    checkboxWrapper: 'checkbox-wrapper',
    checkbox: 'custom-checkbox',
    checkboxChecked: 'checked',
    checkboxUnchecked: 'unchecked',
    checkboxDisabled: 'disabled',
    self: 'checkbox-self',
    children: 'checkbox-children'
  },
  svgIcons: {
    done: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>`,

    done_outline: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M19.77 5.03l1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z"/>
    </svg>`
  }
}

export default C

export const getCheckboxClassName = (p: Props) => {
  return `${C.classNames.checkbox} ${p.checked ? C.classNames.checkboxChecked : ''} ${
    p.disabled ? C.classNames.checkboxDisabled : ''
  }`
}
