export default function ({store, redirect}) {
  console.log(store.state.status_id ,'ddddd')
  if (store.state.status_id == 3) {
    console.log('session middleware')
    return redirect('/');
  }

}
