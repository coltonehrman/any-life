export const NewFriendPopup = ({
  id,
  looks,
  smarts,
  craziness,
  name,
  gender,
  age,
  oob,
} = {}) => {
  return (
    <div
      id={`popup-${id}`}
      class="popup flex z-50"
      hx-swap-oob={oob ? oob : ""}
    >
      <div class="p-6 rounded-lg bg-zinc-700 text-white max-w-[325px]">
        <div class="flex border-b-2 border-green-500">
          <div class="flex w-full justify-between items-center pb-4">
            <h2 class="m-0 text-white text-5xl">{name}</h2>
            <span class="text-green-500">Friend</span>
          </div>
        </div>

        <div class="p-5 text-white">
          <div class="text-center text-4xl emoji">😊</div>
          <h3 class="text-center my-2">New Friend</h3>
          <p class="text-center">
            A {gender} named {name} wants to become your friend.
          </p>

          <div class="my-4 text-white font-bold">
            <div class="bg-zinc-800 flex justify-between p-2 mb-1">
              <span>Name:</span>
              <span>{name}</span>
            </div>

            <div class="bg-zinc-800 flex justify-between p-2 mb-1">
              <span>Gender:</span>
              <span>{gender}</span>
            </div>

            <div class="bg-zinc-800 flex justify-between p-2">
              <span>Age:</span>
              <span>{age}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <span>Looks:</span>
              <div class="progress-track">
                <div class="progress-fill" style={`width: ${looks}%;`}></div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span>Smarts:</span>
              <div class="progress-track">
                <div class="progress-fill" style={`width: ${smarts}%;`}></div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span>Craziness:</span>
              <div class="progress-track">
                <div
                  class="progress-fill"
                  style={`width: ${craziness}%;`}
                ></div>
              </div>
            </div>
          </div>

          <div class="mt-5">
            <button
              hx-post={`/game/life-event/${id}`}
              hx-vals='{"choice": "ACCEPT"}'
              hx-target={`#popup-${id}`}
              class="py-4 w-full bg-blue-500 text-white border-none p-2 text-2xl cursor-pointer mb-2"
            >
              Become friends with them
            </button>

            <button
              hx-post={`/game/life-event/${id}`}
              hx-vals='{"choice": "REJECT"}'
              hx-target={`#popup-${id}`}
              class="py-4 w-full bg-gray-600 text-white border-none p-2 text-2xl cursor-pointer mb-2"
            >
              Reject them
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
