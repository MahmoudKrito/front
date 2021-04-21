export default function ({store, redirect}) {
  if (store.state.auth.user) {
    if (store.state.auth.user.user.user_type_id == 4) {
      return true;
      // console.log('true')
    }
  }
  //console.log('false')
  return redirect("/login")


}
