import { beforeEach, describe, expect, it, vi } from "vitest";
import { $window, DomWindow } from "../src/DomWindow";

describe("DomWindow", () => {
  let winWrapper: DomWindow;

  beforeEach(() => {
    // Always start with the global window wrapper
    winWrapper = $window();
  });

  it("wraps global window by default", () => {
    expect(winWrapper.dom).toBe(window);
  });

  it("wraps a provided window instance", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeWin = iframe.contentWindow!;
    const customWrapper = $window(iframeWin);

    expect(customWrapper.dom).toBe(iframeWin);

    // Clean up
    iframe.remove();
  });

  it("getDocument() returns the associated document", () => {
    expect(winWrapper.getDocument()).toBe(document);

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeWin = iframe.contentWindow!;
    const customWrapper = $window(iframeWin);

    expect(customWrapper.getDocument()).toBe(iframeWin.document);

    iframe.remove();
  });

  it("getComputedStyle() returns computed styles for an element", () => {
    const div = document.createElement("div");
    div.style.color = "red";
    document.body.appendChild(div);

    const style = winWrapper.getComputedStyle(div);
    expect(style.color).toBe("rgb(255, 0, 0)"); // resolved value

    div.remove();
  });

  it("on() attaches an event listener and handler is called", () => {
    const handler = vi.fn();

    winWrapper.on("resize", handler);
    window.dispatchEvent(new Event("resize"));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  it("off() removes an event listener so handler is not called", () => {
    const handler = vi.fn();

    winWrapper.on("scroll", handler);
    winWrapper.off("scroll", handler);

    window.dispatchEvent(new Event("scroll"));

    expect(handler).not.toHaveBeenCalled();
  });

  it("on() returns this for chaining", () => {
    const handler = vi.fn();
    const result = winWrapper.on("resize", handler);
    expect(result).toBe(winWrapper);
  });

  it("off() returns this for chaining", () => {
    const handler = vi.fn();
    winWrapper.on("resize", handler);
    const result = winWrapper.off("resize", handler);
    expect(result).toBe(winWrapper);
  });

  it("on() with { once: true } invokes the handler only once", () => {
    const handler = vi.fn();

    winWrapper.on("keydown", handler, { once: true });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "b" }));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("off() respects capture: add with capture and remove with capture", () => {
    const handler = vi.fn();

    winWrapper.on("click", handler, { capture: true });
    winWrapper.off("click", handler, { capture: true });

    window.dispatchEvent(new MouseEvent("click"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("off() without matching capture does not remove the listener", () => {
    const handler = vi.fn();

    winWrapper.on("click", handler, { capture: true });
    // Attempt to remove without capture — should not match the original listener
    winWrapper.off("click", handler);

    window.dispatchEvent(new MouseEvent("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("dispatch() triggers event listeners attached with on()", () => {
    const handler = vi.fn();

    winWrapper.on("resize", handler);
    winWrapper.dispatch(new Event("resize"));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  it("dispatch() works with custom events", () => {
    const handler = vi.fn();
    const customEvent = new CustomEvent("my-event", { detail: { foo: "bar" } });

    winWrapper.on("my-event" as any, handler);
    winWrapper.dispatch(customEvent);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({
      foo: "bar",
    });
  });

  it("dispatch() returns this for chaining", () => {
    const result = winWrapper.dispatch(new Event("scroll"));
    expect(result).toBe(winWrapper);
  });

  it("dispatch() does not throw if no listeners are attached", () => {
    expect(() => {
      winWrapper.dispatch(new Event("resize"));
    }).not.toThrow();
  });

  it("postMessage() calls window.postMessage with correct arguments", () => {
    const spy = vi.spyOn(window, "postMessage");

    const payload = { foo: "bar" };
    winWrapper.postMessage(payload, "*");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(payload, "*");

    spy.mockRestore();
  });

  it("postMessage() can be paired with a manually dispatched MessageEvent (object payload)", () => {
    const handler = vi.fn();
    window.addEventListener("message", handler);

    const payload = { hello: "world" };
    winWrapper.postMessage(payload, "*");

    // jsdom doesn’t deliver postMessage; simulate delivery:
    const evt = new MessageEvent("message", {
      data: payload,
      origin: "",
      source: window,
    });
    window.dispatchEvent(evt);

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as MessageEvent;
    expect(event.data).toEqual(payload);
    expect(event.origin).toBe(""); // jsdom origin is empty string

    window.removeEventListener("message", handler);
  });

  it("postMessage() can be paired with a manually dispatched MessageEvent (primitive payload)", () => {
    const handler = vi.fn();
    window.addEventListener("message", handler);

    const payload = "simple-string";
    winWrapper.postMessage(payload, "*");

    const evt = new MessageEvent("message", {
      data: payload,
      origin: "",
      source: window,
    });
    window.dispatchEvent(evt);

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as MessageEvent;
    expect(event.data).toBe(payload);

    window.removeEventListener("message", handler);
  });

  it("postMessage to iframe contentWindow (manual delivery)", () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const targetWin = iframe.contentWindow!;
    const handler = vi.fn();
    targetWin.addEventListener("message", handler);

    const wrapper = $window(targetWin);
    const payload = { x: 1 };
    wrapper.postMessage(payload, "*");

    // Simulate delivery
    const evt = new MessageEvent("message", {
      data: payload,
      origin: "",
      source: window,
    });
    targetWin.dispatchEvent(evt);

    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as MessageEvent).data).toEqual(payload);

    targetWin.removeEventListener("message", handler);
    iframe.remove();
  });
});
