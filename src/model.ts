import { merge, deepCopy } from 'src/helpers'

const list_row_height = 32
const codepicker_height = 250
const codepicker_width = 250
const padding_left = 15

export enum CheckboxStatus {
  unchecked,
  checked,
  indeterminate
}

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

export type Item<T> = T & {
  id: string //unique across all nodes
  code: string //not unique
  children: Item<T>[]
  visible?: boolean
}

export type RowItem<T> = T & {
  item: Item<T>
  level?: number
}

export type RowsMap<T> = { [key: string]: Item<T> }

export type Counter = { items: number }

export type Stringifier<T> = ((i: Item<T>) => string)

export const expandItem = <T>(
  items: RowItem<T>[],
  item: RowItem<T>,
  index: number,
  expanded: RowsMap<T>
) => {
  Given.items(item.item.children)
    .getRows(expanded, item.level)
    .filter(r => isVisible(r.item))
    .map((r, i) => {
      items.splice(index + i + 1, 0, r)
    })
}

const expandAllItems = <T>(items: Item<T>[], expanded) =>
  items.forEach(i => {
    expanded[i.id] = i
    i.children && expandAllItems(i.children, expanded)
  })

const collapseAllItems = (expanded: Object) => {
  for (var k in expanded) {
    expanded[k] = false
  }
}

export const collapseItem = <T>(
  items: RowItem<T>[],
  item: RowItem<T>,
  index: number,
  expanded: RowsMap<T>
) => {
  items.splice(index + 1, givenItem(item.item).getAllVisibleChildrenLength(expanded))
}

export const toggleSelectItem = <T>(item: Item<T>, selected: RowsMap<T>, state?: CheckModes) => {
  const g = givenItem(item)

  switch (state) {
    case CheckModes.all:
      g.select(selected)
      g.selectDeep(selected)
      break
    case CheckModes.self:
      g.deselectDeep(selected)
      g.select(selected)
      break
    case CheckModes.children:
      g.selectDeep(selected)
      g.deselect(selected)
      break
    case CheckModes.addSelectionSelf:
      g.select(selected)
      break
    case CheckModes.addSelectionChildren:
      g.selectDeep(selected)
      break
    case CheckModes.removeSelectionSelf:
      g.deselect(selected)
      break
    case CheckModes.removeSelectionChildren:
      g.deselectDeep(selected)
      break
    case CheckModes.none:
      g.deselect(selected)
      g.deselectDeep(selected)
      break
    default:
      g.isSelected(selected)
        ? g.deselect(selected) && g.deselectDeep(selected)
        : g.select(selected) && g.selectDeep(selected)
      break
  }
}

export const getItemStatus = <T>(item: Item<T>, selected: RowsMap<T>) => {
  if (item.children.length == 0) {
    return undefined
  }
  var childToggle = givenItem(item.children[0]).isSelected(selected)
  var partialState = false
  partialState = givenItem(item).isPartiallySelected(selected, childToggle)

  return partialState
    ? CheckboxStatus.indeterminate
    : childToggle
      ? CheckboxStatus.checked
      : CheckboxStatus.unchecked
}

export const getRows = <T>(items: Item<T>[], expanded: RowsMap<T>, level?: number) => {
  let _l = level !== undefined && level >= 0 ? level + 1 : 0
  let rows: RowItem<T>[] = []
  items.forEach((i, l) => {
    const _k = i.id
    isVisible(i) && rows.push(itemToRow(i, _l))
    if (expanded[_k] && !isLeaf(i)) {
      rows = rows.concat(getRows(i.children, expanded, _l))
    }
  })
  return rows
}

export const itemToRow = <T>(i: Item<T>, l: number) => {
  return {
    item: i,
    level: l
  } as RowItem<T>
}

export const clickToCheckModes = e => {
  if (e.shiftKey && e.altKey) {
    return CheckModes.children
  }
  if (e.shiftKey) {
    return CheckModes.self
  }
  return undefined
}

const isVisible = i => i.visible == undefined || i.visible
const isLeaf = i => !i.children || i.children.length == 0

const filterTree = <T>(
  _items: Item<T>[],
  filter: string,
  stringifier: Stringifier<T>,
  counter: Counter
) => {
  const _filterTree = <T>(_i: Item<T>) => {
    return (_i.visible =
      ((_i && _i.children && _i.children.filter(c => _filterTree(c)).length > 0) || match(_i)) &&
      counter.items++ >= 0
        ? true
        : false)
  }
  const match = <T>(i) => stringifier(i).indexOf(filter) > -1
  _items.forEach(i => i && _filterTree(i))
}

export const givenItems = <T>(items: Item<T>[]) => ({
  getRows: (expanded: RowsMap<T>, level?: number) => getRows(items, expanded, level),
  filter: (filter: string, stringifier, counter) =>
    filterTree(items, filter || '', stringifier, counter),
  expandAll: expanded => expandAllItems(items, expanded),
  collapseAll: expanded => collapseAllItems(expanded)
})

export const givenRows = <T>(items: RowItem<T>[]) => ({
  expandItem: (item: RowItem<T>, index: number, expanded: RowsMap<T>) =>
    expandItem(items, item, index, expanded),
  collapseItem: (item: RowItem<T>, index: number, expanded: RowsMap<T>) =>
    collapseItem(items, item, index, expanded)
})

const isItemSelected = <T>(i: Item<T>, selected: RowsMap<T>) => (selected[i.code] ? true : false)
const isItemPartiallySelected = <T>(i: Item<T>, selected: RowsMap<T>, toggle: boolean) =>
  i.children.length > 0
    ? i.children.find(_i => isItemPartiallySelected(_i, selected, toggle))
    : isItemSelected(i, selected) != toggle

export const givenItem = <T>(i: Item<T>) => ({
  toggleSelect: (selected: RowsMap<T>, state?: CheckModes) => toggleSelectItem(i, selected, state),
  isSelected: (selected: RowsMap<T>) => isItemSelected(i, selected),
  deselect: (selected: RowsMap<T>) => delete selected[i.code],
  select: (selected: RowsMap<T>) => (selected[i.code] = i),
  selectDeep: (selected: RowsMap<T>) =>
    i.children.forEach(_i => givenItem(_i).select(selected) && givenItem(_i).selectDeep(selected)),
  deselectDeep: (selected: RowsMap<T>) =>
    i.children.forEach(
      _i => givenItem(_i).deselect(selected) && givenItem(_i).deselectDeep(selected)
    ),
  isPartiallySelected: (selected: RowsMap<T>, toggle: boolean) =>
    isItemPartiallySelected(i, selected, toggle),
  status: (selected: RowsMap<T>) => getItemStatus(i, selected),
  isExpanded: (expanded: RowsMap<T>) => (expanded[i.id] ? true : false),
  visible: () => isVisible(i),
  leaf: () => isLeaf(i),
  hasVisibleChildren: () => i.children.filter(c => givenItem(c).visible()).length > 0,
  getAllVisibleChildrenLength: (expanded: RowsMap<T>) => {
    let counter = 0
    i.children &&
      i.children.filter(c => givenItem(c).visible()).map(c => {
        counter++
        if (expanded[c.id]) {
          counter += givenItem(c).getAllVisibleChildrenLength(expanded)
        }
      })
    return counter
  }
})

export const Given = {
  items: givenItems,
  item: givenItem,
  rows: givenRows
}

const CP = {
  list: {
    row_height: list_row_height,
    ref: 'List',
    height: codepicker_height,
    width: codepicker_width
  },
  classNames: {
    icon: 'material-icons',
    searchField: 'search-field'
  },
  row: {
    padding_left: (level: number, shift?) => level * (shift || padding_left)
  }
}

export default CP
