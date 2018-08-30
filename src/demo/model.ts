import * as faker from 'faker'

import Demo from './demo'

export type FakeItem = {
  name: string
  age: number
  code: string
  children: FakeItem[]
  id
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randomBool = () => (getRandomInt(0, 1) == 1 ? true : false)

let uid = 1
export const initFakeItems = (n: number = 1000, _level?) => {
  var level = _level || 0
  let list: FakeItem[] = []

  for (let i = 0; i < n; i++) {
    list.push({
      name: faker.name.findName(),
      code: faker.internet.email(),
      age: faker.random.number(),
      id: uid++,
      children: level >= 4 ? [] : randomBool() ? initFakeItems(getRandomInt(1, 20), level + 1) : []
    })
  }

  return list
}

export const textComparison = (a, b, prop: (a: any) => any) => {
  const _a = JSON.stringify(prop(a))
    .toLowerCase()
    .trim()
  const _b = JSON.stringify(prop(b))
    .toLowerCase()
    .trim()
  return _a < _b ? -1 : _a > _b ? 1 : 0
}

export const demo = (d: Demo) => {
  const p = d.props
  const s = d.state

  return {
    toggleNavbar: (val?) =>
      d.setState({
        navbar: val !== undefined ? val : !s.navbar
      }),

    toggleSidebar: (val?) =>
      d.setState({
        openSidebar: val !== undefined ? val : !s.openSidebar
      })
  }
}
