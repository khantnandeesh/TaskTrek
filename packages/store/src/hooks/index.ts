import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";




export function useBalance(){
    return useRecoilValue(balanceAtom)
}