import ErrorCommons from './ErrorCommons.json'

export const errorConstants = {
  CONSTANT_MESSAGE: 'Oops! something went wrong.',
}


export function getErrorMessage (code, constant) {
  let found = ErrorCommons.find(o => o.code === code);
  if(found){
    if(constant){
      let codeMessage = found.message;
      let arr = codeMessage.split(' ')
      const newarr = arr.map((item)=> {
        if(item.substring(0, 2) === '<%'){
          return constant
        }
        return item
      })
      return {
        found: true,
        message: newarr.join(' ')
      }
    }
  }else{
    return {
      found: false
    }
  }
}