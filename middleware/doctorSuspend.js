export default function ({store, redirect}) {
  if (store.state.auth.user) {
    if (store.state.auth.user.user.user_type_id == 2) {
      if (store.state.auth.user.user.is_suspended == 1) {
        return true;
      }

    }
  }
  return redirect("/doctors/dashboard/account-suspended")
}
