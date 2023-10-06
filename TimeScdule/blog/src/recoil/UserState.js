import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage", //원하는 key 값 입력
  storage: sessionStorage,
});
export const userNameState = atom({
  key: "userNameState",
  default: null, // 초기 값
  effects_UNSTABLE: [persistAtom],
});
export const userIdState = atom({
  key: "userIdState",
  default: null, // 초기 값
  effects_UNSTABLE: [persistAtom],
});
