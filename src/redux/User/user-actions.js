export const GET_RECENT_ACCOUNTS = 'GET_RECENT_ACCOUNTS'
export const RECENT_ACCOUNTS_SUCCESS = 'RECENT_ACCOUNTS_SUCCESS'
export const RECENT_ACCOUNTS_FAIL = 'RECENT_ACCOUNTS_FAIL'

export const getRecentAccountsData = () => {
    return {
        type: GET_RECENT_ACCOUNTS,
        payload: {}
    }
}
