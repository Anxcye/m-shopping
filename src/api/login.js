import instance from '@/utils/request'

export function getPicCode () {
  return instance.get('/captcha/image')
}
