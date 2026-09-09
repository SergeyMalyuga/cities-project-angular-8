import {createAction, props} from '@ngrx/store';
import {City} from '../../../core/models/city';

export const changeCity = createAction('[City] Change City', props<{ city: City }>());
