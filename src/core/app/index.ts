import { App, IAppOption } from './app'

/**
 * Create an Vue Enterprise app.
 *
 * @description
 * App is the basic unit for a project.
 *
 * @param {IAppOption} option
 * @return {App}
 */
function createApp (option: IAppOption) {
  return new App(option)
}

export {
  createApp
}
