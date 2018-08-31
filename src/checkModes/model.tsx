import * as React from 'react'

import {
    ContextMenuItem
} from 'src/contextMenu/model'

import SelectAll from './selectAll'
import SelectNone from './selectNone'
import SelectChildren from './selectChildren'
import SelectSelf from './SelectSelf'
import AddSelectionChildren from './addSelectionChildren'
import AddSelectionSelf from './addSelectionSelf'
import RemoveSelectionChildren from './removeSelectionChildren'
import RemoveSelectionSelf from './removeSelectionSelf'

export enum CheckModes {
    none,
    all,
    self,
    children,
    addSelectionSelf,
    addSelectionChildren,
    removeSelectionSelf,
    removeSelectionChildren
}

type CheckModeItems = {[key:string]:CheckModeItem}

export type CheckModeItem = {
    title: 'Select All',
	icon: any,
    shortcut: string | null,
    checkmode: number
}

export enum CheckModeIconType {
    add,
    remove,
    force
}


export const checkModes = {
    [CheckModes[CheckModes.all]] : {
        title: 'Select All',
        icon: <SelectAll/>,
        shortcut: null,
        checkmode: CheckModes.all
    },
    [CheckModes[CheckModes.none]] : {
        title: 'Deselect All',
        icon: <SelectNone/>,
        shortcut: null,
        checkmode: CheckModes.none
    },
    [CheckModes[CheckModes.self]] : {
        title: 'Select only the node',
        icon: <SelectSelf/>,
        shortcut: 'Shift + Click',
        checkmode: CheckModes.self
    },
    [CheckModes[CheckModes.children]] : {
        title: 'Select only the children',
        icon: <SelectChildren/>,
        shortcut: 'Shift + Alt + Click',
        checkmode: CheckModes.children
    },
    [CheckModes[CheckModes.addSelectionSelf]] : {
        title: 'Add selection over the node alone',
        icon: <AddSelectionSelf/>,
        shortcut: null,
        checkmode: CheckModes.addSelectionSelf
    },
    [CheckModes[CheckModes.addSelectionChildren]] : {
        title: 'Add selection over the children alone',
        icon: <AddSelectionChildren/>,
        shortcut: null,
        checkmode: CheckModes.addSelectionChildren
    },
    [CheckModes[CheckModes.removeSelectionSelf]] : {
        title: 'Remove selection from the node only',
        icon: <RemoveSelectionSelf/>,
        shortcut: null,
        checkmode: CheckModes.removeSelectionSelf
    },
    [CheckModes[CheckModes.removeSelectionChildren]] : {
        title: 'Remove selection from the children only',
        icon: <RemoveSelectionChildren/>,
        shortcut: null,
        checkmode: CheckModes.removeSelectionChildren
    }
} as CheckModeItems

export const checkModesToContextmenuItems = (toggleSelect) => {
    return Object.keys(checkModes).map(k=>checkModes[k])
    .map(cm=>({
        title: cm.title,
        icon: cm.icon,
        shortcut: cm.shortcut,
        onClick: e=>toggleSelect(e, cm.checkmode)
    } as ContextMenuItem))
}