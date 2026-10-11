import { describe, expect, it } from "vitest";
import { resolveFrozenCaptureDisplay } from "./captureDisplay";

const captured = { id: 2, bounds: { x: 1440, y: 0, width: 1920, height: 1080 }, scaleFactor: 2 };

describe("frozen capture display", () => {
	it("follows the captured display when its position changes, including negative origins", () => {
		const moved = { ...captured, bounds: { ...captured.bounds, x: -1920, y: -240 } };
		const primary = { ...captured, id: 1 };
		expect(resolveFrozenCaptureDisplay(captured, [primary, moved])).toBe(moved);
	});

	it("does not switch a disconnected capture to another display", () => {
		expect(resolveFrozenCaptureDisplay(captured, [{ ...captured, id: 1 }])).toBeNull();
	});

	it.each([
		{ ...captured, bounds: { ...captured.bounds, width: 1600 } },
		{ ...captured, bounds: { ...captured.bounds, height: 1200 } },
		{ ...captured, scaleFactor: 1 },
	])("rejects geometry changes that would stretch or misalign the frozen pixels: %j", (changed) => {
		expect(resolveFrozenCaptureDisplay(captured, [changed])).toBeNull();
	});
});
