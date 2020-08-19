export interface Item {
  id: string,
  objectNumber: string,
  title: string,
  longTitle: string,
  webImage: {
    url: string
  },
  imgHeader: string
}

export interface DetailedItem {
    id: string,
    objectNumber: string,
    title: string,
    webImage: {
      url: string
    },
    description: string,
    principalMaker: string,
    objectTypes: string[]
    favourite?: boolean
}
