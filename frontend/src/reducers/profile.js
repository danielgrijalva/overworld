import { LOAD_PROFILE, FOLLOW, UNFOLLOW } from "../actions/types";

const initialState = {
  isLoading: true,
  profile: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case FOLLOW:
      return {
        ...state,
        profile: { ...state.profile, following: true }
      };
    case UNFOLLOW:
      return {
        ...state,
        profile: { ...state.profile, following: false }
      };
    default:
      return state;
  }
}
