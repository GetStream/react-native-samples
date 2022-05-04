import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native'

export const sizes = {
  xxs: 1,
  xs: 2,
  s: 4,
  sm: 6,
  m: 8,
  ml: 12,
  l: 16,
  lxl: 20,
  xl: 24,
  xxl: 30,
  xxxl: 36,
}

type FlexStyle = ViewStyle | TextStyle | ImageStyle

const directionRow: FlexStyle = {
  flexDirection: 'row',
}
const itemsCenter: FlexStyle = {
  alignItems: 'center',
}
const itemsEnd: FlexStyle = {
  alignItems: 'flex-end',
}
const contentSpaceBetween: FlexStyle = {
  justifyContent: 'space-between',
}

const contentEnd: FlexStyle = {
  justifyContent: 'flex-end',
}

const contentCenter: FlexStyle = {
  justifyContent: 'center',
}

const flex1: FlexStyle = {
  flex: 1,
}

export const directionRowItemsCenter: FlexStyle = {
  ...directionRow,
  alignItems: 'center',
}
export const directionRowItemsEnd: FlexStyle = {
  ...directionRow,
  alignItems: 'flex-end',
}
export const flex = StyleSheet.create({
  directionRow,
  itemsCenter,
  contentSpaceBetween,
  contentCenter,
  contentEnd,
  flex1,
  directionRow1: {
    ...directionRow,
    ...flex1,
  },
  directionRowItemsEnd,
  directionRowItemsCenter,
  directionRowItemsContentCenter: {
    ...directionRowItemsCenter,
    ...contentCenter,
  },
  directionRowItemsCenter1: {
    ...directionRowItemsCenter,
    ...flex1,
  },
  directionRowContentEnd: {
    ...directionRow,
    ...contentEnd,
  },
  directionRowContentSpaceBetween: {
    ...directionRow,
    ...contentSpaceBetween,
  },
  directionRowItemsCenterContentSpaceBetween1: {
    ...directionRow,
    ...contentSpaceBetween,
    ...itemsCenter,
    ...flex1,
  },
  directionRowItemsEndContentSpaceBetween: {
    ...directionRowItemsEnd,
    ...contentSpaceBetween,
  },
  directionRowItemsContentEnd1: {
    ...directionRow,
    ...contentEnd,
    ...itemsEnd,
    ...flex1,
  },
  contentSpaceBetween1: {
    ...contentSpaceBetween,
    ...flex1,
  },
  contentCenter1: {
    ...contentCenter,
    ...flex1,
  },
  itemsCenter1: {
    ...itemsCenter,
    ...flex1,
  },
  itemsContentCenter1: {
    ...itemsCenter,
    ...contentCenter,
    ...flex1,
  },
  itemsCenterContentSpaceBetween1: {
    ...itemsCenter,
    ...contentSpaceBetween,
    ...flex1,
  },
})

export const globalStyles = StyleSheet.create({
  iconWrap: {
    padding: sizes.m + 2,
    marginVertical: sizes.s,
    borderRadius: sizes.xl,
  },
})
