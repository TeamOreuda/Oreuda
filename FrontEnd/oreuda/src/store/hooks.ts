import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";
/**
 * useDispatch에는 기본 redux 디스패치 반환 유형이 있으며 미들웨어가 디스패치 반환을 변경할 수 있다는 사실을 고려하지 않습니다. useAppDispatch 유형을 만들면 썽크와 같이 앱에 있을 수 있는 유형에 대한 추가 고려 사항을 추가할 수 있습니다.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
