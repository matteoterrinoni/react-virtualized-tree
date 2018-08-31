export type ContextMenuProps = {
  onClose
  items: ContextMenuItem[]
}

export type ContextMenuItem = {
  title: string
  icon: any
  shortcut: string | null
  onClick
}
