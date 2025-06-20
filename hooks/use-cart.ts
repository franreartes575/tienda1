import{create} from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore{
    items:Product[];
    addItem:(data:Product) => void;
    removeItem:(id:string) => void;
    removeAll:()=>void;
};

const useCart=create(
    persist<CartStore>((set,get) => ({
        items:[],
        addItem:(data:Product) =>{
            const currentItems = get().items;
            const existingItem = currentItems.find((item)=>item.id===data.id);

            if(existingItem){
                return toast("El articulo ya se encuentra en el carrito.");
            }

            set({
                items:[...get().items, data]
            });
            toast.success("Articulo agregado al carrito.");
        },
        removeItem:(id:string)=>{
            set({items:[...get().items.filter((item)=>item.id !== id)]});
            toast.success("Articulo eliminado del carrito.")
        },
        removeAll:()=> set({items:[]}),
    }),{name:"cart-storage",
        storage:createJSONStorage(()=>localStorage)
    })
)

export default useCart;