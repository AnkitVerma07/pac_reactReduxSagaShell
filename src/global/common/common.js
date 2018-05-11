import React, { Component } from 'react'

export const accountConstants = {
  INDIV_ACCT_TYPE: 'I',
  ORG_ACCT_TYPE: 'O',
  WARN_STATUS: 'W'
}

export function getValueFromListByKeyField (list, field, value) {
  let result = null
  if (list && list.length > 0) {
    list.map((item) => {
      if (item.key[field] == value) {
        result = item
        return
      }
    })
  }
  return result
}

export function mapByObjectField (list, objField, groupField) {
  let map = {}
  if (!objField || !groupField)
    return map
  if (list) {
    list.map((value) => {
      var mapItems = map[value[objField][groupField]]
      if (!mapItems) {
        map[value[objField][groupField]] = []
      }
      map[value[objField][groupField]].push(value)
    })
  }
  return map
}

export function collectionHasValues (collection) {
  if (collection && collection.length > 0) {
    return true
  } else {
    return false
  }
}

export function getCodeName (list, value) {
  const codeName = getValueFromListByKeyField(list, 'id', value)
  if (codeName) {
    return codeName.name['en_US']
  } else {
    return ''
  }
}

export function sortByProperty (array, p_fieldName, p_reverse) {
  if (array && array.length > 0) {
    return array.sort(function (a, b) {
      var result
      var aa = a[p_fieldName]
      var bb = b[p_fieldName]
      if (aa + 0 == aa && bb + 0 == bb) {
        result = aa - bb
      } else {
        result = aa.localeCompare(bb)
      }
      if (p_reverse)
        return result * -1
      else
        return result
    })
  }
  else {
    return []
  }
}

export function hasErrors (result) {
  let errorMessage
  if (result && result.status) {
    if (result.status.cd != 0) {
      errorMessage = result.status.level > 1000 ? 'Warning: ' : 'Error: '
      if (collectionHasValues(result.status.mgs)) {
        result.status.mgs.map((error) => {
          errorMessage += error
        })
      }
    }
  }
  return errorMessage
}

export const getValueFromListByField = function (p_list, p_field, p_value) {
  if (p_list && p_list.length > 0) {
    var listItem
    for (var i = 0; i < p_list.length; i++) {
      listItem = p_list[i]
      if (listItem[p_field] == p_value)
        return listItem
    }
  } else {
    return null
  }
}

export const matchAtWordBoundaries = function (matches, text) {
  if (matches !== null && matches !== undefined && matches !== '' && text && text.trim().length > 0) {
    /* no case sensitive, however, should highlight the exact matching word */
    var matchesInArray = matches.split(' ')

    for (var i = 0; i < matchesInArray.length; i++) {
      var matchedRegex = new RegExp(matchesInArray[i], 'i')
      if (matchedRegex.test(text)) {
        return true
      }
    }

    return false
  } else {
    return false
  }
}

export const escapeRegexSpecialCharacters = function (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const hookIgnoreWhiteSpaceSearch = function (text) {
  text = escapeRegexSpecialCharacters(text)
	text = text.replace(/(\\\s)+/g, '\\s*') // replacing contiguous escaped spaces with zero or more space regexp.
  return text
}

export const highlightText = function (match, text, renderInternalMatch, customClassName) {
  if (match && text && text.trim().length > 0) {
    text = text.replace(/[\*\?]/g, ' ')
    var searchTokens = match.split(' ')
    if (searchTokens.length == 1) {
      /*i for no case sensitive, however, should highlight the exact matching word */
      /*g to replace all matches*/
			var regex = null
			var replaceExpression = null
			if (customClassName) {
				replaceExpression = `<span class=${customClassName}>$1</span>`
			} else {
				replaceExpression = '<span class="text-match-result">$1</span>'
			}

      if (renderInternalMatch) {
        regex = new RegExp('(' + hookIgnoreWhiteSpaceSearch(match) + ')', 'ig')
      } else {
        regex = new RegExp('\\b(' + hookIgnoreWhiteSpaceSearch(match) + ')', 'ig')
			}

			text = text.replace(regex, replaceExpression)

    } else {
      var resultItems = text.split(' ')
      var result = []
      text = ''
      searchTokens.forEach((token) => {
        if (token.length == 0) {
          return true
        }
        var regex = null
        var replaceExpression = '<span class="text-match-result">$1</span>'
        resultItems.forEach((item, index) => {
          if (renderInternalMatch) {
            regex = new RegExp('(' + hookIgnoreWhiteSpaceSearch(token) + ')', 'ig')
          } else {
            regex = new RegExp('\\b(' + hookIgnoreWhiteSpaceSearch(token) + ')', 'ig')
          }
          if (result[index]) {
            if (!result[index].startsWith('<span class="text-match-result">')) {
              result[index] = item.replace(regex, replaceExpression) + ' '
            }
          } else {
            result.push(item.replace(regex, replaceExpression) + ' ')
          }
        })
      })

      result.forEach((word) => {
        text += word
      })
    }
  }
  return <span className="content" dangerouslySetInnerHTML={{__html: text.trim()}}></span>
}

export const upperCaseFirstLetterInWord = function (value) {
  return value.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1)
  })
}

export const convertListToString = function (items) {
  var result = ''
  if (items) {
    $.each(items, function (index, item) {
      result += item
      if (index != items.length - 1) {
        result += ', '
      }
    })
  }
  return result
}

export function handleResponse(response) {
    let result = null
    if (response.status == 200) {
        result = response.json()
    } else {
        result = { status : { cd : response.status, mg: (response.status + ' ' + response.statusText + ': ' + response.url)}}
    }
    return result
}

export function isInt(n) {
  return Number(n) === n && n % 1 === 0
}

export function replaceLineBreaksWithHTML(string) {
  return string !== undefined ? string.replace(/\n/g, '<br>') : "";
 }

export function replaceHTMLWithLineBreaks(string) {
  const regExp = /<br>|\\r\\n|\\n/gi
  if (typeof string === 'object' ) {
    let keys = Object.keys(string)
    let values = Object.values(string)
    let _object = values.reduce((acc, curr, idx) => {
      let _key = keys[idx] ? keys[idx].replace(regExp, '\r\n') : '';
      let _value = curr ? curr.replace(regExp, '\r\n') : '';
      acc[_key] = _value
      return acc
    }, {})
    return _object
  }
  else {
    return string !== undefined ? string.replace(regExp, '\r\n') : "";
  }
}

export function formatUSD(number, c, d, t) {
  var n = number,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

export const dataSelect = (data, selectKeys = []) => {
  data = data.map(row => {
    return selectKeys.reduce((acc, key) => {
      return Object.assign(acc, { [key]: row[key] })
    }, {})
  })
  return data
}

export const formatDates = (date, format = 'mm/dd/yy') => {
  if (!date) {
    return null
  }
  if (typeof date === 'string') {
    date = date.split('-')
    if (date.length < 2) {
      return date
    }
    if (format === 'mm/dd/yy') {
      date = `${date[1]}/${date[2].slice(0, 2)}/${date[0].slice(2, 4)}`
    } else if (format === 'yy/mm/dd') {
      date = `${date[0]}/${date[1]}/${date[2].slice(0, 2)}`
    }
  } else {
    date = date[0]
  }
  return date
}

export const isBodyOverflow = (element) => {
  return element.clientHeight < element.scrollHeight
}


export const parseDateIso8601 = (p_iso8601) => {
    var timestamp, struct, minutesOffset = 0, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ]

    // ES5 Ã‚Â§15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
    // before falling back to any implementation-specific date parsing, so thatÃ¢â‚¬â„¢s what we do, even if native
    // implementations could be faster
    //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 Ã‚Â±    10 tzHH    11 tzmm
    if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(p_iso8601))
      || (struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})((\d{2}))?)?)?$/.exec(p_iso8601))) {
      // avoid NaN timestamps caused by Ã¢â‚¬Å“undefinedÃ¢â‚¬ï¿½ values being passed to Date.UTC
      for (var i = 0, k; (k = numericKeys[i]); ++i) {
        struct[k] = +struct[k] || 0
      }

      // allow undefined days and months
      struct[2] = (+struct[2] || 1) - 1
      struct[3] = +struct[3] || 1

      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11]

        if (struct[9] === '+') {
          minutesOffset = 0 - minutesOffset
        }
      }

      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7])
    }
    else {
      timestamp = Date.parse(p_iso8601)
    }

    return new Date(timestamp)
}

export const formatIso8601DateTime = (p_date, p_pattern, p_locale, p_timezone, p_timezoneName) => {
	return formatDateTime(parseDateIso8601(p_date), p_pattern, p_locale, p_timezone, p_timezoneName)
}

export const locale_data = {
        en_US : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"","d_t_fmt":"%a %d %b %Y %r %Z","int_n_sep_by_space":"1","p_sep_by_space":"0","time_full":"h:mm a","date_medium":"MMM d, yyyy","mon_grouping":"3;3","int_n_sign_posn":"","currency_symbol":"$","int_p_cs_precedes":"","d_fmt":"%mm/%dd/%YY","time_long":"hh:mm:ss a z","n_sign_posn":"1","frac_digits":"2","int_frac_digits":"2","time_medium":"hh:mm:ss a","t_fmt":"%r","int_curr_symbol":"USD ","date_short":"MM/dd/yy","mon_thousands_sep":",","am_pm":"AM;PM","mon":"January;February;March;April;May;June;July;August;September;October;November;December","n_sep_by_space":"0","time_default":"hh:mm:ss a","date_full":"EEEE, MMMM d, yyyy","mon_decimal_point":".","t_fmt_ampm":"%I:%M:%S %p","n_cs_precedes":"1","abday":"Sun;Mon;Tue;Wed;Thu;Fri;Sat","negative_sign":"-","time_short":"hh:mm a","abmon":"Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec","int_p_sep_by_space":"1","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"MMM d, yyyy","day":"Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday","p_cs_precedes":"1","date_long":"MMMM d, yyyy"},
        es_MX : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"","d_t_fmt":"%a %d %b %Y %T %Z","int_n_sep_by_space":"","p_sep_by_space":"1","time_full":"h:mm a","date_medium":"dd/MM/yyyy","mon_grouping":"3;3","int_n_sign_posn":"","currency_symbol":"$","int_p_cs_precedes":"","d_fmt":"%dd/%mm/%yy","time_long":"hh:mm:ss a z","n_sign_posn":"1","frac_digits":"2","int_frac_digits":"2","time_medium":"hh:mm:ss a","t_fmt":"%T","int_curr_symbol":"MXN ","date_short":"dd/MM/yy","mon_thousands_sep":",","am_pm":";","mon":"enero;febrero;marzo;abril;mayo;junio;julio;agosto;septiembre;octubre;noviembre;diciembre","n_sep_by_space":"1","time_default":"hh:mm:ss a","date_full":"EEEE d' de 'MMMM' de 'yyyy","mon_decimal_point":".","t_fmt_ampm":"","n_cs_precedes":"1","abday":"dom;lun;mar;mié;jue;vie;sáb","negative_sign":"-","time_short":"hh:mm a","abmon":"ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic","int_p_sep_by_space":"","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"dd/MM/yyyy","day":"domingo;lunes;martes;miércoles;jueves;viernes;sábado","p_cs_precedes":"1","date_long":"d' de 'MMMM' de 'yyyy"},
        fr_CA : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"","d_t_fmt":"%a %d %b %Y %T %Z","int_n_sep_by_space":"","p_sep_by_space":"1","time_full":"H' h 'mm","date_medium":"yyyy-MM-dd","mon_grouping":"3;3","int_n_sign_posn":"","currency_symbol":"$","int_p_cs_precedes":"","d_fmt":"%YY-%mm-%dd","time_long":"HH:mm:ss z","n_sign_posn":"0","frac_digits":"2","int_frac_digits":"2","time_medium":"HH:mm:ss","t_fmt":"%T","int_curr_symbol":"CAD ","date_short":"yy-MM-dd","mon_thousands_sep":" ","am_pm":";","mon":"janvier;février;mars;avril;mai;juin;juillet;août;septembre;octobre;novembre;décembre","n_sep_by_space":"1","time_default":"HH:mm:ss","date_full":"EEEE d MMMM yyyy","mon_decimal_point":",","t_fmt_ampm":"","n_cs_precedes":"0","abday":"dim;lun;mar;mer;jeu;ven;sam","negative_sign":"-","time_short":"HH:mm","abmon":"jan;fév;mar;avr;mai;jun;jui;aoû;sep;oct;nov;déc","int_p_sep_by_space":"","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"yyyy-MM-dd","day":"dimanche;lundi;mardi;mercredi;jeudi;vendredi;samedi","p_cs_precedes":"0","date_long":"d MMMM yyyy"},
        zh_CN : {"positive_sign":"","date_fmt":"%YY年 %mm月 %dd日 %A %H:%M:%S %Z","int_p_sign_posn":"1","d_t_fmt":"%Y年%m月%d日 %A %H时%M分%S秒","int_n_sep_by_space":"0","p_sep_by_space":"0","time_full":"ah'时'mm'分'","date_medium":"yyyy-MM-dd","mon_grouping":"3","int_n_sign_posn":"1","currency_symbol":"￥","int_p_cs_precedes":"1","d_fmt":"%YY年%mm月%dd日","time_long":"ahh'时'mm'分'ss'秒'","frac_digits":"2","n_sign_posn":"4","int_frac_digits":"2","time_medium":"H:mm:ss","t_fmt":"%H时%M分%S秒","int_curr_symbol":"CNY ","date_short":"yy-MM-dd","mon_thousands_sep":",","mon":"一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月","am_pm":"上午;下午","n_sep_by_space":"0","time_default":"H:mm:ss","date_full":"yyyy'年'MM'月'dd'日' EEEE","mon_decimal_point":".","n_cs_precedes":"1","t_fmt_ampm":"%p %I时%M分%S秒","negative_sign":"-","abday":"日;一;二;三;四;五;六","time_short":"ah:mm","abmon":"1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月","int_p_sep_by_space":"0","int_n_cs_precedes":"1","p_sign_posn":"4","date_default":"yyyy-MM-dd","day":"星期日;星期一;星期二;星期三;星期四;星期五;星期六","p_cs_precedes":"1","date_long":"yyyy'年'MM'月'dd'日'"},
        zh_HK : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"","d_t_fmt":"%Y年%m月%d日 %A %H:%M:%S","int_n_sep_by_space":"","p_sep_by_space":"0","time_full":"ah'時'mm'分'","date_medium":"yyyy'年'MM'月'd'日'","mon_grouping":"3","int_n_sign_posn":"","currency_symbol":"HK$","int_p_cs_precedes":"","d_fmt":"%Y年%m月%d日 %A","time_long":"ahh'時'mm'分'ss'秒'","frac_digits":"2","n_sign_posn":"0","int_frac_digits":"2","time_medium":"ahh:mm:ss","t_fmt":"%I時%M分%S秒 %Z","int_curr_symbol":"HKD ","date_short":"yy'年'MM'月'dd'日'","mon_thousands_sep":",","mon":"一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月","am_pm":"上午;下午","n_sep_by_space":"0","time_default":"ahh:mm:ss","date_full":"yyyy'年'MM'月'dd'日' EEEE","mon_decimal_point":".","n_cs_precedes":"1","t_fmt_ampm":"%p %I:%M:%S","negative_sign":"-","abday":"日;一;二;三;四;五;六","time_short":"ah:mm","abmon":"1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月","int_p_sep_by_space":"","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"yyyy'年'MM'月'd'日'","day":"星期日;星期一;星期二;星期三;星期四;星期五;星期六","p_cs_precedes":"1","date_long":"yyyy'年'MM'月'dd'日' EEEE"},
        zh_SG : {"positive_sign":"","date_fmt":"","int_p_sign_posn":"","d_t_fmt":"%YY年%mm月%dd日 %H时%M分%S秒 %Z","int_n_sep_by_space":"","p_sep_by_space":"0","time_full":"a h:mm","date_medium":"dd-MMM-yy","mon_grouping":"3","int_n_sign_posn":"","currency_symbol":"$","int_p_cs_precedes":"","d_fmt":"%YY年%mm月%dd日","time_long":"a hh:mm:ss","frac_digits":"2","n_sign_posn":"0","int_frac_digits":"2","time_medium":"a hh:mm","t_fmt":"%H时%M分%S秒 %Z","int_curr_symbol":"SGD ","date_short":"dd/MM/yy","mon_thousands_sep":",","mon":"一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月","am_pm":"上午;下午","n_sep_by_space":"0","time_default":"a hh:mm","date_full":"d MMMM yyyy","mon_decimal_point":".","n_cs_precedes":"1","t_fmt_ampm":"","negative_sign":"-","abday":"星期日;星期一;星期二;星期三;星期四;星期五;星期六","time_short":"a hh:mm","abmon":"一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月","int_p_sep_by_space":"","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"dd-MMM-yy","day":"星期日;星期一;星期二;星期三;星期四;星期五;星期六","p_cs_precedes":"1","date_long":"d MMM yyyy"},
        zh_TW : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"1","d_t_fmt":"西元%Y年%m月%d日 (%A) %H時%M分%S秒","int_n_sep_by_space":"0","p_sep_by_space":"0","time_full":"ah'時'mm'分'","date_medium":"yyyy/MM/dd","mon_grouping":"3","int_n_sign_posn":"1","currency_symbol":"NT$","int_p_cs_precedes":"1","d_fmt":"西元%Y年%m月%d日","time_long":"ahh'時'mm'分'ss'秒'","frac_digits":"2","n_sign_posn":"1","int_frac_digits":"2","time_medium":"a hh:mm:ss","t_fmt":"%H時%M分%S秒","int_curr_symbol":"TWD ","date_short":"yyyy/MM/dd","mon_thousands_sep":",","mon":"一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月","am_pm":"上午;下午","n_sep_by_space":"0","time_default":"a hh:mm:ss","date_full":"yyyy'年'MM'月'd'日' EEEE","mon_decimal_point":".","n_cs_precedes":"1","t_fmt_ampm":"%p %I時%M分%S秒","negative_sign":"-","abday":"日;一;二;三;四;五;六","time_short":"a h:mm","abmon":" 1月; 2月; 3月; 4月; 5月; 6月; 7月; 8月; 9月;10月;11月;12月","int_p_sep_by_space":"0","int_n_cs_precedes":"1","p_sign_posn":"1","date_default":"yyyy/MM/dd","day":"週日;週一;週二;週三;週四;週五;週六","p_cs_precedes":"1","date_long":"yyyy'年'MM'月'dd'日'"},
        ru_RU : {"positive_sign":"","date_fmt":"%a %b %e %H:%M:%S %Z %Y","int_p_sign_posn":"","d_t_fmt":"%a %d %b %Y %T","int_n_sep_by_space":"","p_sep_by_space":"1","time_full":"H:mm","date_medium":"dd.MM.yyyy","mon_grouping":"3;3","int_n_sign_posn":"","currency_symbol":"руб","int_p_cs_precedes":"","d_fmt":"%dd.%mm.%YY","time_long":"H:mm:ss z","n_sign_posn":"1","frac_digits":"2","int_frac_digits":"2","time_medium":"H:mm:ss","t_fmt":"%T","int_curr_symbol":"RUB ","date_short":"dd.MM.yy","mon_thousands_sep":" ","am_pm":";","mon":"Январь;Февраль;Март;Апрель;Май;Июнь;Июль;Август;Сентябрь;Октябрь;Ноябрь;Декабрь","n_sep_by_space":"1","time_default":"H:mm:ss","date_full":"d MMMM yyyy 'г.'","mon_decimal_point":",","t_fmt_ampm":"","n_cs_precedes":"0","abday":"Вс.;Пн.;Вт.;Ср.;Чт.;Пт.;Сб.","negative_sign":"-","time_short":"H:mm","abmon":"янв.;февр.;марта;апр.;мая;июня;июля;авг.;сент.;окт.;нояб.;дек.","int_p_sep_by_space":"","int_n_cs_precedes":"","p_sign_posn":"1","date_default":"dd.MM.yyyy","day":"Воскресенье;Понедельник;Вторник;Среда;Четверг;Пятница;Суббота","p_cs_precedes":"0","date_long":"d MMMM yyyy 'г.'"}
}

// internal utilities
export const format_number = (n, length) => {
	var value = n + ''
	if (value.length < length)
	{
		for (var i = value.length; i < length; i++)
		{
			value = '0' + value
		}
	}

	return value
}

export const week_in_year = (d) => {
	d = new Date(d)
	d.setHours(0, 0, 0)

	d.setDate(d.getDate() + 4 - (d.getDay() || 7))

	var yearStart = new Date(d.getFullYear(), 0, 1)
	var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)

	return weekNo
}

export const week_in_month = (d) => {
	d = new Date(d)
	return 0 | d.getDate() / 7
}

export const day_in_year = (d) => {
	var feb = 28

	if (d.getYear() % 4 === 0 && (d.getYear() % 100 !== 0 || d.getYear() % 400 === 0))
	{
		// Leap year
		return 29
	}

	var aggregateMonths = [0, // January
	31, // February
	31 + feb, // March
	31 + feb + 31, // April
	31 + feb + 31 + 30, // May
	31 + feb + 31 + 30 + 31, // June
	31 + feb + 31 + 30 + 31 + 30, // July
	31 + feb + 31 + 30 + 31 + 30 + 31, // August
	31 + feb + 31 + 30 + 31 + 30 + 31 + 31, // September
	31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30, // October
	31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31, // November
	31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 // December
	]

	return aggregateMonths[d.getMonth()] + d.getDate()
}


export const formatDateTime = (p_date, p_pattern, p_locale, p_timezone, p_timezoneName) => {
	// time-zone
	p_timezone = ( typeof p_timezone !== 'undefined') ? p_timezone : 0

	// prepare data
	var year = p_date.getFullYear()
	var month = p_date.getMonth()
	var date = p_date.getDate()
	var weekday = p_date.getDay()

	var hour = p_date.getHours()
	var minute = p_date.getMinutes()
	var second = p_date.getSeconds()
	var milliseconds = p_date.getMilliseconds()

	var timezone = p_timezone
	if (timezone >= 0)
	{
		timezone = (timezone >= 10) ? '+' + (timezone * 100) : '+0' + (timezone * 100)
	}
	else
	{
		timezone = (timezone <= -10) ? '-' + (timezone * 100) : '-0' + ((0 - timezone) * 100)
	}
	var timezoneName = ( typeof p_timezoneName !== 'undefined') ? p_timezoneName : (p_timezone == 0 ? 'GMT' : timezone)

	var weekday_data = locale_data[p_locale]['day'].split(';')
	var weekday_data_short = locale_data[p_locale]['abday'].split(';')
	var month_data = locale_data[p_locale]['mon'].split(';')
	var month_data_short = locale_data[p_locale]['abmon'].split(';')
	var am_pm_data = locale_data[p_locale]['am_pm'].split(';')

	var clockTime12 = ''
	if (hour < 12)
	{
		clockTime12 += (hour < 10) ? '0' + hour : hour
	}
	else
	{
		clockTime12 += (hour < 22) ? '0' + (hour - 12) : hour - 12
	}
	clockTime12 += ':'
	clockTime12 += (minute < 10) ? '0' + minute : minute
	clockTime12 += ':'
	clockTime12 += (second < 10) ? '0' + second : second
	clockTime12 += ' '

	var clockTime24s = ''
	clockTime24s += (hour < 10) ? '0' + hour : hour
	clockTime24s += ':'
	clockTime24s += (minute < 10) ? '0' + minute : minute

	var clockTime24 = ''
	clockTime24 += (hour < 10) ? '0' + hour : hour
	clockTime24 += ':'
	clockTime24 += (minute < 10) ? '0' + minute : minute
	clockTime24 += ':'
	clockTime24 += (second < 10) ? '0' + second : second

	// begin format
	var current_pos = 0
	var formatted_string = ''
	var clip = ''

	// format time pattern
	var format_pattern = function(src_pattern)
	{
		var src = src_pattern

		if (RegExp(/(y+)/).test(src))
		{
			if (RegExp.$1.length <= 2)
			{
				src = src.replace(RegExp.$1, (year + '').substr(2))
			}
			else
			{
				var value = format_number(year, RegExp.$1.length)
				src = src.replace(RegExp.$1, value)
			}
		}

		if (RegExp(/(w+)/).test(src))
		{
			var value = format_number(week_in_year(p_date), RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(W+)/).test(src))
		{
			var value = format_number(week_in_month(p_date), RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(D+)/).test(src))
		{
			var value = format_number(day_in_year(p_date), RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(d+)/).test(src))
		{
			var value = format_number(date, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(F+)/).test(src))
		{
			var value = format_number(weekday + 1, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(a+)/).test(src))
		{
			src = src.replace(RegExp.$1, am_pm_data[hour < 12 ? 0 : 1])
		}

		if (RegExp(/(H+)/).test(src))
		{
			var value = format_number(hour, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(k+)/).test(src))
		{
			var value = hour == 0 ? 24 : hour
			value = format_number(value, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(K+)/).test(src))
		{
			var value = hour > 12 ? hour - 12 : hour
			value = format_number(value, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(h+)/).test(src))
		{
			var value = hour > 12 ? hour - 12 : hour
			value = value == 0 ? 12 : value
			value = format_number(value, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(m+)/).test(src))
		{
			var value = format_number(minute, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(s+)/).test(src))
		{
			var value = format_number(second, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(S+)/).test(src))
		{
			var value = format_number(milliseconds, RegExp.$1.length)
			src = src.replace(RegExp.$1, value)
		}

		if (RegExp(/(G+)/).test(src))
		{
			if (year > 0)
			{
				src = src.replace(RegExp.$1, 'AD')
			}
			else
			{
				src = src.replace(RegExp.$1, '')
			}
		}

		// alter-way to replace labels
		var month_pos = -1, month_length = 4
		if (RegExp(/(MM+)/).test(src))
		{
			month_pos = src.indexOf(RegExp.$1)
			month_length = RegExp.$1.length
		}

		var weekday_pos = -1, weekday_length = 4
		if (RegExp(/(E+)/).test(src))
		{
			weekday_pos = src.indexOf(RegExp.$1)
			weekday_length = RegExp.$1.length
		}

		var timezoneName_pos = -1, timezoneName_length = 4
		if (RegExp(/(z+)/).test(src))
		{
			timezoneName_pos = src.indexOf(RegExp.$1)
			timezoneName_length = RegExp.$1.length
		}

		var timezone_pos = -1, timezone_length = 4
		if (RegExp(/(Z+)/).test(src))
		{
			timezone_pos = src.indexOf(RegExp.$1)
			timezone_length = RegExp.$1.length
		}

		// replace in one single pass
		var src_updated = ''

		for (var i = 0; i < src.length; i++)
		{
			if (i == month_pos)
			{
				if (month_length <= 2)
				{
					var value = format_number(month + 1, month_length)
					src_updated += value
				}
				else
				if (month_length == 3)
				{
					src_updated += month_data_short[month]
				}
				else
				{
					src_updated += month_data[month]
				}
				i += (month_length - 1)
			}
			else
			if (i == weekday_pos)
			{
				if (weekday_length < 4)
				{
					src_updated += weekday_data_short[weekday]
				}
				else
				{
					src_updated += weekday_data[weekday]
				}
				i += (weekday_length - 1)
			}
			else
			if (i == timezoneName_pos)
			{
				src_updated += timezoneName
				i += (timezoneName_length - 1)
			}
			else
			if (i == timezone_pos)
			{
				src_updated += timezone
				i += (timezone_length - 1)
			}
			else
			{
				src_updated += src.charAt(i)
			}
		}

		return src_updated
	}

	while (true)
	{
		var clip_pos = p_pattern.indexOf('\'', current_pos)

		if (clip_pos == -1)
		{
			clip = p_pattern.substr(current_pos)
			formatted_string += format_pattern(clip)
			break
		}

		if (clip_pos + 1 < p_pattern.length)
		{
			if (p_pattern.charAt(clip_pos + 1) === '\'')
			{
				clip = p_pattern.substr(current_pos, clip_pos - current_pos + 1)
				formatted_string += format_pattern(clip)

				current_pos = clip_pos
			}
			else
			{
				clip = p_pattern.substr(current_pos, clip_pos - current_pos)
				formatted_string += format_pattern(clip)

				var clip_pos_end = clip_pos
				while (true)
				{
					clip_pos_end = p_pattern.indexOf('\'', clip_pos_end)

					if (clip_pos_end == -1)
					{
						return null
					}

					if (clip_pos_end + 1 < p_pattern.length)
					{
						if (p_pattern.charAt(clip_pos_end + 1) === '\'')
						{
							clip = p_pattern.substr(clip_pos + 1, clip_pos_end - clip_pos)
							formatted_string += clip

							clip_pos = clip_pos_end + 1
							clip_pos_end = clip_pos_end + 2
						}
						else
						{
							clip = p_pattern.substr(clip_pos + 1, clip_pos_end - clip_pos - 1)
							formatted_string += clip

							clip_pos = clip_pos_end + 1
							current_pos = clip_pos
							break
						}
					}
				}
			}
		}
		else
		{
			// this will handle the situation that the final character of pattern is "'"
			clip = p_pattern.substr(current_pos, clip_pos - current_pos)
			formatted_string += clip

			break
		}
	}

	return formatted_string
}

export const getTimeStamp = function () {
  var date = new Date()
  return '_=' + date.valueOf()
}
