import { configureStore } from "@reduxjs/toolkit";
import proposalSlice from "@/app/store/slice/proposalSlice";
import companySlice from "@/app/store/slice/companySlice";
import warehouseSlice from "./slice/warehouseSlice";
import basketSlice from "./slice/basket/basketSlice";
import authSlice from "./slice/auth/authSlice";
import { authApi } from "./slice/auth/authService";
import userSlice from "./slice/user/userSlice";
import { userApi } from "./slice/user/userService";
import specialEqProposalSlice from "./specialEqSlice/proposalSlice";
import specialEqCompanySlice from "./specialEqSlice/companySlice";
import specialEqWarehouseSlice from "./specialEqSlice/warehouseSlice";
import specialEqBasketSlice from "./specialEqSlice/basket/basketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    proposal: proposalSlice,
    company: companySlice,
    warehouse: warehouseSlice,
    basket: basketSlice,
    specialEqProposal: specialEqProposalSlice,
    specialEqCompany: specialEqCompanySlice,
    specialEqWarehouse: specialEqWarehouseSlice,
    specialEqBasket: specialEqBasketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
