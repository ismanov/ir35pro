import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import projectsSaga from "./contractors/saga"
import draftsSaga from "./drafts/saga"
import contactsSaga from "./contacts/saga"
import companySaga from "./company/saga"
import notificationsSaga from "./notifications/saga"
import clientFormsSaga from "./client-forms/saga"
import chatSaga from "./chat/saga"
import myTasks from "./my-tasks/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(projectsSaga),
    fork(draftsSaga),
    fork(contactsSaga),
    fork(notificationsSaga),
    fork(chatSaga),
    fork(myTasks),
    fork(companySaga),
    fork(clientFormsSaga),
  ])
}
