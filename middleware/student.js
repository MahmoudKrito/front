export default function ({ store, redirect }) {
    if (store.state.auth.user) {
        if (store.state.auth.user.user.user_type_id == 3) {
            return true;
        }
    }
    return redirect("/login")
}
