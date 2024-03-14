const INFO_KEY = 'hm_info'

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
