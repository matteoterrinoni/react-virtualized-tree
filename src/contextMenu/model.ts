import { CheckModes } from 'src/model'

export type ContextMenuProps = {
  onPick
  onClose
}

type CheckModeItems = { [key: string]: CheckModeItem }

export type CheckModeItem = {
  title: 'Select All'
  icon: any
  shortcut: string | null
  checkmode: number
}

export default {
  checkModes: {
    [CheckModes[CheckModes.all]]: {
      title: 'Select All',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.all
    },
    [CheckModes[CheckModes.none]]: {
      title: 'Deselect All',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.none
    },
    [CheckModes[CheckModes.self]]: {
      title: 'Select only the node',
      icon: null,
      shortcut: 'Shift + Click',
      checkmode: CheckModes.self
    },
    [CheckModes[CheckModes.children]]: {
      title: 'Select only the children',
      icon: null,
      shortcut: 'Shift + Alt + Click',
      checkmode: CheckModes.children
    },
    [CheckModes[CheckModes.addSelectionSelf]]: {
      title: 'Add selection over the node alone',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.addSelectionSelf
    },
    [CheckModes[CheckModes.addSelectionChildren]]: {
      title: 'Add selection over the children alone',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.addSelectionChildren
    },
    [CheckModes[CheckModes.removeSelectionSelf]]: {
      title: 'Remove selection from the node only',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.removeSelectionSelf
    },
    [CheckModes[CheckModes.removeSelectionChildren]]: {
      title: 'Remove selection from the children only',
      icon: null,
      shortcut: null,
      checkmode: CheckModes.removeSelectionChildren
    }
  } as CheckModeItems
}
