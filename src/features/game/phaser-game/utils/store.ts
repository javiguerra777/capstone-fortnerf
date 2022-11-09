import store from '../../../../app/redux';

// gets information from redux store related to the information used in game
const getStore = () => {
  const state = store.getState();
  const { user, game } = state;
  return { user, game };
};
// allows for users to be able to use the keyboard if they click on another DOM element
export const keyboardChecker = (input: any) => {
  const {
    game: { disableKeyBoard },
  } = getStore();
  if (disableKeyBoard) {
    input.keyboard.enabled = false;
    input.keyboard.disableGlobalCapture();
  } else {
    input.keyboard.enabled = true;
    input.keyboard.enableGlobalCapture();
  }
};

export default getStore;
