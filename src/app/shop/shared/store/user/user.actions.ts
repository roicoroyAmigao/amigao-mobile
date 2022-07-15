/* eslint-disable @typescript-eslint/no-namespace */

import { IUser } from '../../types/models/User';

export namespace UserActions {
    export class GetUser {
        static readonly type = '[User] Get';
        constructor() { }
    }
    export class SetUser {
        static readonly type = '[User] Get';
        constructor(public payload: IUser) { }
    }
    export class LogOutUser {
        static readonly type = '[User] Out';
    }

}
