import { limitWaitingTime, TimeoutError } from "./limit-waiting-time";

describe("limitWaitingTime", () => {
  it("должен разрешиться, если данное обещание разрешается", async () => {
    const timeoutCallback = jest.fn();
    const testPromise = delay(100).then(() => "a");

    const resultPromise = limitWaitingTime(testPromise, 200, timeoutCallback);

    await expect(resultPromise).resolves.toEqual("a");
    expect(timeoutCallback).not.toHaveBeenCalled();
  });

  it("должен отклонить обещание после тайм-аута", async () => {
    const timeoutCallback = jest.fn();
    const testPromise = delay(200).then(() => "a");

    const resultPromise = limitWaitingTime(testPromise, 100, timeoutCallback);

    await expect(resultPromise).rejects.toEqual(new TimeoutError("Истекло время ожидания после 100ms"));
    expect(timeoutCallback).toHaveBeenCalledTimes(1);
  });

  it("должен отклонить, если это обещание отклоняется преждевременно, без вызова timeoutCallback ", async () => {
    const timeoutCallback = jest.fn();
    const testPromise = delay(100).then(() => {
      throw new Error("b");
    });

    const resultPromise = limitWaitingTime(testPromise, 200, timeoutCallback);

    await expect(resultPromise).rejects.toEqual(new Error("b"));
    expect(timeoutCallback).not.toHaveBeenCalled();
  });
});

async function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
