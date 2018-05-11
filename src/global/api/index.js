const RECENT_ACCOUNTS_URL = `/app/ws/patron/recent`

export const fetchRecentAccounts = () => {
    return fetch(RECENT_ACCOUNTS_URL + '?', {
        credentials: 'include'
    }).then(res => res.json())
}