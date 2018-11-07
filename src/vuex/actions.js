export const likChange = ({ dispatch }, islike) => {
  dispatch('LIKECHANGE', islike)
}

export const addSearch = ({ dispatch }, value) => {
  dispatch('ADDSEARCH', value)
}