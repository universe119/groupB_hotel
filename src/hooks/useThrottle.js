import { useRef } from "react";

export default function useThrottle(func, interval = 300) {
	const ref_timer = useRef(null);

	return () => {
		if (ref_timer.current) return;

		ref_timer.current = setTimeout(() => {
			func();
			ref_timer.current = null;
		}, interval);
	};
}
