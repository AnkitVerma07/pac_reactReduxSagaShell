import * as customizationActions from './customizationMiddleware/custom-actions'
import * as userActions from './User/user-actions'

export default {
    ...customizationActions,
    ...userActions
}