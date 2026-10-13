import { create } from "zustand";

interface OverlayState {
	overlayOpen: boolean;
	setOverlayOpen: (value: boolean) => void;
	errorDialogOpen: boolean;
	setErrorDialogOpen: (value: boolean) => void;
	message: string;
	setMessage: (value: string) => void;
	errorDialogMessage: string[];
	setErrorDialogMessage: (value: string[]) => void;
	confirmLoading: boolean;
	setConfirmLoading: (value: boolean) => void;
}

const useOverlay = create<OverlayState>((set) => ({
	overlayOpen: false,
	setOverlayOpen: (value: boolean) => set({ overlayOpen: value }),
	errorDialogOpen: false,
	setErrorDialogOpen: (value: boolean) => set({ errorDialogOpen: value }),
	message: "",
	setMessage: (value: string) => set({ message: value }),
	errorDialogMessage: [],
	setErrorDialogMessage: (value: string[]) =>
		set({ errorDialogMessage: value }),
	confirmLoading: false,
	setConfirmLoading: (value: boolean) => set({ confirmLoading: value }),
}));

export default useOverlay;
