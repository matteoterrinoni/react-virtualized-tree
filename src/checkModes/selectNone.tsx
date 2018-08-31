import * as React from 'react'

import {
    CheckboxStatus
} from 'src/checkbox/model'

import Checkbox from 'src/checkbox'

import './style.scss'
import CheckModeIcon from './checkModeIcon';
import { CheckModeIconType } from './model';

export const SelectNone = ()=>(
    <CheckModeIcon type={CheckModeIconType.force}>
        <Checkbox checked={false} status={CheckboxStatus.unchecked}/>
    </CheckModeIcon>
)

export default SelectNone