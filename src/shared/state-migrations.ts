import { RootState } from "shared/state";

// @todo check maybe it is possible to get rid of any.
export const stateMigrations = {
  0: (state: any): any => {
    const newState: RootState = {
      ...state,
    };

    return {
      ...newState,
    };
  },
};
