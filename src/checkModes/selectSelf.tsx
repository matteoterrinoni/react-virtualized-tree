import * as React from 'react'

import {
    CheckboxStatus
} from 'src/checkbox/model'

import Checkbox from 'src/checkbox'

import './style.scss'
import CheckModeIcon from './checkModeIcon';
import { CheckModeIconType } from './model';

export const SelectSelf = ()=>(
    <CheckModeIcon type={CheckModeIconType.force}>
        <Checkbox checked={true} status={CheckboxStatus.unchecked}/>
    </CheckModeIcon>
)

export default SelectSelf