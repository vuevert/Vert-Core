class Data {
  static createTypeSecuredInstance <T> (Constructor: new (...args) => any, ...args): T {
    const obj = new Constructor(...args)
    return new Proxy(obj, {
      set (target, keyName, value, proxy) {
        const newType = getType(value)
        const correctType = getType(target[keyName])
        if (newType === correctType) {
          target[keyName] = value
        } else {
          console.warn(
            `[Warn] Incorrect data type was given to property "${keyName}" on "${Constructor.name}":\n` +
            `       "${value}" (${getTypeText(newType)}) was given, but should be a ${getTypeText(correctType)}.`
          )
        }
        // Always return true for avoid error throwing.
        return true
      }
    })
  }
}

function getType (target: any) {
  return Object.prototype.toString.call(target)
}

function getTypeText (fullTypeString: string) {
  return fullTypeString.replace(/\[object |\]/g, '')
}

export {
  Data
}
