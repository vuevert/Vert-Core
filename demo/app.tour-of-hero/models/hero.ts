class Hero {
  name: string
  level: number
  type: string
  hp: number
  mp: number
  attack: number

  constructor (param: IHero) {
    this.name = param.name
    this.level = param.level
    this.type = param.type
    this.hp = param.hp
    this.mp = param.mp
    this.attack = param.attack
  }
}

interface IHero {
  name: string
  level: number
  type: string
  hp: number
  mp: number
  attack: number
}

export {
  Hero,
  IHero
}
