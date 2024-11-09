
 import { atom, atomFamily } from "recoil";
import { Axios } from "axios";

export const balanceAtom = atom({
    key: "balance",
    default: 0,
})

export const dataAtomFamily=atomFamily({
    key:'todosAtomFamily',
    default:(authorId:any,startDate:Date) :any  => {
        
        return async function (){


          let data=
    
        }
    }
})
