import * as React from 'react'

import {
    CheckboxStatus,
    CheckboxMethods
} from 'src/checkbox/model'

import Checkbox from 'src/checkbox'

import './style.scss'
import CheckModeIcon from './checkModeIcon';
import { CheckModeIconType } from './model';

export const RemoveSelectionSelf = ()=>(
    <CheckModeIcon type={CheckModeIconType.remove}>
        <Checkbox method={CheckboxMethods.remove} checked={true} status={CheckboxStatus.unchecked}/>
    </CheckModeIcon>
)

export default RemoveSelectionSelf