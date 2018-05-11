
// This will be a customized webdev file - will be namespaced as a look up to work as the same thing
const CUSTOMIZED_ACTION_UPDATE = 'CUSTOMIZED_ACTION_UPDATE'

export const updateText = (store, action, next) => {
    // store.getState is mutable
    // store.dispatch to dispatch new action
    store.dispatch({
        type: CUSTOMIZED_ACTION_UPDATE,
        payload: {
            manifest: {
                information: {
                    text: store.getState().manifest.information.text + '+'
                }
            }
        }
    })
}