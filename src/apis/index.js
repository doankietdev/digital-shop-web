import * as viApis from './vi'
import * as enApis from './en'

const language = localStorage.getItem('language') || 'vi'

const apis = language === 'vi' ? viApis : enApis

export default apis