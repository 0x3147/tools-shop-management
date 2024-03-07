import { NIcon } from 'naive-ui'

const renderIcon = (name: Component) => {
  return () => h(NIcon, null, { default: () => h(name) })
}

export { renderIcon }
