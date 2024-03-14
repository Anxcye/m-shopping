const INFO_KEY = 'hm_info'
const HISTORY_KEY = 'hm_history'

export const getInfo = (info) => {
  const res = localStorage.getItem(INFO_KEY)

  return res
    ? JSON.parse(res)
    : {
        token: '',
        userId: ''
      }
}

export const setInfo = (info) => {
  console.log(info)
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

export const getHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)

  return res ? JSON.parse(res) : []
}

export const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
