import { configureStore} from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { linksSlice } from "./links/linksSclice";
import { authSlice } from "./auth/authSlice";
import { linksSliceUser } from "./links/linkUserLink";


 export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        link: linksSlice.reducer,
        auth:authSlice.reducer,
        linkUser:linksSliceUser.reducer

    },
    middleware: ( getDefaultMiddleware ) =>  getDefaultMiddleware({
        serializableCheck: false
    })

 })