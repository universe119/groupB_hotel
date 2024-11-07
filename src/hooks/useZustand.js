import { create } from "zustand";

export const useZustandStore = create(set => ({
	isModal: false,
	isMenu: false,
	isLoggedIn: false,

	setModalOpen: () => set({ isModal: true }),
	setModalClose: () => set({ isModal: false }),
	setMenuClose: () => set({ isMenu: false }),
	setMenuToggle: () => set(state => ({ isMenu: !state.isMenu })),
	login: () => set({ isLoggedIn: true, isModal: false })
}));
