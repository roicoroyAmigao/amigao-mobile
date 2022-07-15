import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LanguageService } from '../../services/language/language.service';
import { LanguageActions } from './language.actions';

export class LanguageStateModel {
    language: string;
}
@State<LanguageStateModel>({
    name: 'languages',
    defaults: {
        language: null,
    }
})
@Injectable()
export class LanguageState {
    constructor(
        private languageService: LanguageService,
    ) {
    }
    @Action(LanguageActions.Get)
    get({ getState, setState }: StateContext<LanguageStateModel>) {
        return this.languageService.getLanguages().subscribe((result) => {
            const state = getState();
            setState({
                ...state,
                language: result,
            });
        });
    }
    @Action(LanguageActions.Add)
    add({ getState, setState }: StateContext<LanguageStateModel>) {
        return this.languageService.getLanguages().subscribe((result) => {
            console.log(result);
        });
    }
}
