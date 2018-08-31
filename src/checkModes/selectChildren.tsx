import * as React from 'react'

import {
    CheckboxStatus
} from 'src/checkbox/model'

import Checkbox from 'src/checkbox'

import './style.scss'
import CheckModeIcon from './checkModeIcon';
import { CheckModeIconType } from './model';

export const SelectChildren = ()=>(
    <CheckModeIcon type={CheckModeIconType.force}>
        <Checkbox checked={false} status={CheckboxStatus.checked}/>
    </CheckModeIcon>
)

export default SelectChildren