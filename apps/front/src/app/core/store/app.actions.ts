import { createAction, props } from '@ngrx/store';
import { Item } from '@project/api-interfaces';

enum AppActionsType {
  search = '[app] search',

  save = '[app] save',
  saveSuccess = '[app] save success',
  saveFailed = '[app] save failed',

  list = '[app] list',
  listSuccess = '[app] list success',
  listFailed = '[app] list failed',

  delete = '[app] delete',
  deleteSuccess = '[app] delete success',
  deleteFailed = '[app] delete failed',
}

export const AppActions = {
  search: createAction(AppActionsType.search, props<{ search: string }>()),

  save: createAction(AppActionsType.save, props<{ item: Item }>()),
  saveSuccess: createAction(
    AppActionsType.saveSuccess,
    props<{ item: Item }>()
  ),
  saveFailed: createAction(
    AppActionsType.saveFailed,
    props<{ error: string }>()
  ),

  list: createAction(AppActionsType.list),
  listSuccess: createAction(
    AppActionsType.listSuccess,
    props<{ items: Item[] }>()
  ),
  listFailed: createAction(
    AppActionsType.listFailed,
    props<{ error: string }>()
  ),

  delete: createAction(AppActionsType.delete, props<{ uuid: string }>()),
  deleteSuccess: createAction(AppActionsType.deleteSuccess),
  deleteFailed: createAction(
    AppActionsType.deleteFailed,
    props<{ error: string }>()
  ),
};
