export const YearlySalaryIncome = ({ id, amount, oob } = {}) => {
  return (
    <div
      id={`popup-${id}`}
      class="popup flex z-50"
      hx-swap-oob={oob ? oob : ""}
    >
      <div class="p-6 rounded-lg bg-zinc-700 text-white">
        <div class="flex border-b-2 border-green-500">
          <div class="flex w-full justify-between items-center pb-4">
            <span class="text-green-500">Income</span>
          </div>
        </div>

        <div class="p-5 text-white">
          <h3 class="text-center my-2">Income</h3>
          <p class="text-center">Your annual income.</p>

          <div class="my-4 text-black">
            <div class="bg-slate-200 flex justify-between p-2">
              <span>Amount:</span>
              <span>{amount.format()}</span>
            </div>
          </div>

          <div class="mt-5">
            <button
              hx-post={`/game/life-event/${id}`}
              hx-target={`#popup-${id}`}
              hx-swap="outerHTML"
              class="py-4 w-full bg-green-500 text-white border-none p-2 text-2xl cursor-pointer mb-2"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
