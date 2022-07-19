import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IonStorageService } from '../../services/ionstorage.service';
import { IUser } from '../../types/models/User';
import { UserActions } from './user.actions';

export class UserStateModel {
    user: IUser;
    isLoggedIn: boolean;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: null,
        isLoggedIn: null,
    }
})
@Injectable()
export class UserState {
    constructor(
        private storage: IonStorageService,
    ) {
    }
    @Selector()
    static getUserState(state: UserStateModel) {
        return state;
    }
    @Action(UserActions.GetUser)
    getUser({ getState, setState }: StateContext<UserStateModel>, { }: UserActions.GetUser) {
        const state = getState();
        return setState({
            ...state,
            user: null,
            isLoggedIn: true
        });
    }
    @Action(UserActions.SetUser)
    setUser({ getState, setState }: StateContext<UserStateModel>, { payload }: UserActions.SetUser) {
        if (payload) {
            const state = getState();
            return setState({
                ...state,
                user: payload,
                isLoggedIn: true
            });
        }
    }
    @Action(UserActions.LogOutUser)
    logOutUser({ getState, patchState }: StateContext<UserStateModel>) {
        const state = getState();
        return patchState({
            ...state,
            user: null,
            isLoggedIn: false
        });
    }
}
