const NewSchoolPopup = ({ id, name, type, level, years, oob } = {}) => {
  return (
    <div
      id={`popup-${id}`}
      class="popup flex z-50"
      hx-swap-oob={oob ? oob : ""}
    >
      <div class="p-6 rounded-lg bg-zinc-700 text-white">
        <div class="flex border-b-2 border-green-500">
          <div class="flex w-full justify-between items-center pb-4">
            <span class="text-green-500">Education</span>
          </div>
        </div>

        <div class="p-5 text-white">
          <h3 class="text-center my-2">{level}</h3>
          <p class="text-center">You are starting {level}.</p>

          <div class="my-4 text-black">
            <div class="bg-slate-200 flex justify-between p-2">
              <span>School:</span>
              <span>{name}</span>
            </div>

            <div class="bg-slate-400 flex justify-between p-2">
              <span>Type:</span>
              <span>{type}</span>
            </div>

            <div class="bg-slate-200 flex justify-between p-2">
              <span>Level:</span>
              <span>{level}</span>
            </div>

            <div class="bg-slate-400 flex justify-between p-2">
              <span>Years:</span>
              <span>{years}</span>
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

player.lifeChoices.push({
  id: crypto.randomUUID(),
  name: "Kindergarden",
  type: "Public",
  level: "Kindergarden",
  years: 3,
  view: NewSchoolPopup,
  selected: null,
});
