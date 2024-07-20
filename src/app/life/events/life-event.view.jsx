export const LifeEventPopup = ({ id, heading, body, choices, oob } = {}) => {
  return (
    <div
      id={`popup-${id}`}
      class="popup flex z-50"
      hx-swap-oob={oob ? oob : ""}
    >
      <div class="p-6 rounded-lg bg-zinc-700 text-white max-w-[325px]">
        <div class="flex border-b-2 border-green-500">
          <div class="flex w-full justify-between items-center pb-4">
            <span class="text-green-500">Childhood</span>
          </div>
        </div>

        <div class="p-5 text-white">
          <h3 class="text-center my-2">{heading}</h3>
          <p class="text-center"></p>

          <div class="my-4 text-black text-center">{body}</div>

          <div class="mt-5">
            {choices.map((choice) => (
              <button
                hx-post={`/game/life-event/${id}`}
                hx-vals={`{"choice": "${choice}"}`}
                hx-target={`#popup-${id}`}
                class="py-4 w-full bg-blue-500 text-white border-none p-2 text-2xl cursor-pointer mb-2"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
