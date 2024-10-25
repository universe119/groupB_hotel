import { createContext, useContext } from "react";
export const initState = { isMenu: false, isModal: false };
export const ACTIONS = {
	SET_MENU_TOGGLE: "SET_MENU_TOGGLE",
	SET_MENU_CLOSE: "SET_MENU_CLOSE",
	SET_MODAL_OPEN: "SET_MODAL_OPEN",
	SET_MODAL_CLOSE: "SET_MODAL_CLOSE"
};
export const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_MENU_TOGGLE:
			return { ...state, isMenu: !state.isMenu };
		case ACTIONS.SET_MENU_CLOSE:
			return { ...state, isMenu: false };
		case ACTIONS.SET_MODAL_OPEN:
			return { ...state, isModal: true };
		case ACTIONS.SET_MODAL_CLOSE:
			return { ...state, isModal: false };
		default:
			return state;
	}
};
export const GlobalState = createContext();
export const GlobalDispatch = createContext();

//내부적으로 GlobalContext를 접근하게 해주는 useContext를 자동 호출해주는 useGlobalState커스텀 훅 생성
//하위 컴포넌트에서 전역 데이터 호출 시 필요
//GlobalState만 호출하는 커스텀훅
export const useGlobalState = () => {
	const context = useContext(GlobalState);

	if (!context) throw new Error("해당 훅은 GlobalStateProvider안쪽에서 호출되어야 합니다.");
	return context;
};

//Global dispatch함수만 호출하는 커스텀훅
export const useGlobalDispatch = () => {
	const context = useContext(GlobalDispatch);

	if (!context) throw new Error("해당 훅은 GlobalDispatchProvider안쪽에서 호출되어야 합니다.");
	return context;
};
