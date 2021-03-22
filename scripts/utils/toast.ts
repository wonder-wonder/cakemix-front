export const successToast = (buefy: any, msg: string) => {
  buefy.toast.open({
    duration: 2000,
    queue: false,
    message: msg,
    position: 'is-bottom-right',
    type: 'is-success',
  })
}

export const failureToast = (buefy: any, msg: string, err: number = -1) => {
  buefy.toast.open({
    duration: 3000,
    queue: false,
    position: 'is-bottom-right',
    message: `${msg} ${err === -1 ? '' : `[ Error : ${err} ]`}`,
    type: 'is-danger',
  })
}
