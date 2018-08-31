import * as React from 'react'

import {
    CheckboxStatus
} from 'src/checkbox/model'

import Checkbox from 'src/checkbox'

import './style.scss'
import CheckModeIcon from './checkModeIcon';
import { CheckModeIconType } from './model';

export const AddSelectionSelf = ()=>(
    <div className="checkmode-icon add">
        <CheckModeIcon type={CheckModeIconType.add}>
            <Checkbox checked={true} status={CheckboxStatus.unchecked}/>
        </CheckModeIcon>
    </div>
)

export default AddSelectionSelf