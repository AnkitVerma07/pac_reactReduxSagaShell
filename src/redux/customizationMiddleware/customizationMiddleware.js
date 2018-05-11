
import * as webdevFunctions from './webdevDefinedFunctions'

const customizationMiddleware = store => next => action => {
    // dispatch custom actions here with functions
    if (action.type.startsWith('CUSTOM_')) {
        const funcName = action.type.replace(/^CUSTOM_/, '')
        // run custom actions here
        if (funcName in webdevFunctions) {
            webdevFunctions[funcName](store, action, next)
        } else {
            console.log(`${action.type} was not found in webdevFunctions... No custom function was called`)
            next(action)
        }
    } else {
        next(action)
    }
}

export default customizationMiddleware
