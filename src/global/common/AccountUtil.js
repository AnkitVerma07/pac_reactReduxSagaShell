import { convertListToString } from './common'

export const formatAccountFromJson = function (data) {
  if (data && data.value) {
    data.accountInfo = $.parseJSON(data.value)

    if (data.accountInfo) {
      data.primaryContactId = data.accountInfo.primaryContactId
      data.contactName = data.accountInfo.contactName || ''
      data.accountId = data.accountInfo.accountId || ''
      data.accountName = data.accountInfo.accountName || ''
      data.orgName = data.accountInfo.orgName || ''
      data.accountType = data.accountInfo.accountType || ''
      data.emailList = data.accountInfo.emailList || []
      data.phoneList = data.accountInfo.phoneList || []
      data.addressList = data.accountInfo.addressList || []
      data.extIds = data.accountInfo.extIds ? convertListToString(data.accountInfo.extIds) : []

      if (data.accountInfo.keywords && data.accountInfo.keywords.length > 0) {
        data.keywords = ''
        for (var i = 0; i < data.accountInfo.keywords.length; i++) {
          data.keywords += data.accountInfo.keywords[i]
        }
      } else {
        data.keywords = ''
      }
    }

    if (data.innerHits) {
      data.contacts = []

      for (var i = 0; i < data.innerHits.length; i++) {
        var person = $.parseJSON(data.innerHits[i].value)

        if (person.emailList && person.emailList.length > 0)
          data.emailList = [...data.emailList, ...person.emailList]
        if (person.phoneList && person.phoneList.length > 0)
          data.phoneList = [...data.phoneList, ...person.phoneList]
        if (person.addressList && person.addressList.length > 0)
          data.addressList = [...data.addressList, ...person.addressList]

        data.contacts.push(person)
      }
    }
  }

  return data
}