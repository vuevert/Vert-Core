import qs from 'qs'
import { Injectable } from '../../injection/index'

@Injectable
class Qs {
  parse (str: string, ...args): {[key: string]: string} {
    return qs.parse(str, ...args)
  }

  stringify (obj: {}, ...args): string {
    return qs.stringify(obj, ...args)
  }
}

export {
  Qs
}
