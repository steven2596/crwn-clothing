import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { UserActionTypes } from './user.types';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure } from './user.actions';

export function* getSnapshotFromUser(user) {
    const userRef = yield call(createUserProfileDocument, user);
    const snapshot = yield userRef.get();

    yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
};

export function* signUpAsync({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user, { displayName });
        const snapshot = yield userRef.get();
        alert('Account Sign Up Successful');
        yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
    } catch (error) {
        yield put(signUpFailure(error))
    }
};

export function* googleSignInAsync() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);

        yield call(getSnapshotFromUser, user)

    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* emailSignInAsync({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);

        yield call(getSnapshotFromUser, user);

    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUser(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* userSignOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START,
        signUpAsync
    )
};

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,
        googleSignInAsync
    )
};

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,
        emailSignInAsync
    )
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START,
        userSignOut
    )
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart)
    ])
};

//redux-saga flow for Sign in With Email
// 1. User filled email, password and clicked Sign In Button which will cause handleSubmit(form submit).
// 2. emailSignInStart(email, password) is invoked.
// 3. emailSignInStart in user.action.js is called. 
// 4. onEmailSignInStart() is listening for UserActionTypes.EMAIL_SIGN_IN_START and it receives the action.
// 5. emailSignInAsync() is invoked.
// As a result, the user will be set as currentUser in user redux state.

//redux-saga flow for Sign in with Google is the same except it doesn't require email and password.