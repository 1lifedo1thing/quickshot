import type { Display } from "electron";

type CaptureDisplay = Pick<Display, "id" | "bounds" | "scaleFactor">;

/** A frozen frame can follow a moved display, but cannot change its pixel geometry. */
export function resolveFrozenCaptureDisplay<T extends CaptureDisplay>(
	captured: T,
	current: readonly T[],
): T | null {
	const display = current.find((candidate) => candidate.id === captured.id);
	if (
		!display ||
		display.bounds.width !== captured.bounds.width ||
		display.bounds.height !== captured.bounds.height ||
		display.scaleFactor !== captured.scaleFactor
	) return null;
	return display;
}
