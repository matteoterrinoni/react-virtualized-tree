import * as React from 'react'

import {
    CheckboxStatus
} from 'src/checkbox/model'

import {
    CheckModeIconType
} from './model'

import Checkbox from 'src/checkbox'

import CheckModeIcon from './checkModeIcon'

export const AddSelectionChildren = ()=>(
    <CheckModeIcon type={CheckModeIconType.add}>
        <Checkbox checked={false} status={CheckboxStatus.checked}/>
    </CheckModeIcon>
)

export default AddSelectionChildren