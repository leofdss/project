import { Item } from '@project/api-interfaces';

export interface AppState {
  search: string;
  list: {
    loading: boolean;
    error: string | null;
    items: Item[];
  };
  save: {
    error: string | null;
    loading: boolean;
  };
  delete: {
    error: string | null;
    loading: boolean;
  };
}
