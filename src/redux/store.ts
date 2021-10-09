import languageReducer from "./language/languageReducer";
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from "./middlewares/actionLog";
import { combineReducers,configureStore } from '@reduxjs/toolkit';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice} from './productSearch/slice';
import { userSlice } from './user/slice'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //引用local storage
import { shoppingCartSlice } from "./shoppingCart/slice";



const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,

}) 

/** singin status persist
 * use redux-persist plugin
 * default storage strategy: local storage
 * whitelist and blacklist does not need to appear together
 */
const persistConfig = {
    key: "root", //persist named space 数据根目录
    storage, //defaulxt storage strategy: local storage,no need to change
    whitelist: ["user"] // only store user part from all data in store
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog));

const store = configureStore ({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true,
})

/** persisted store */
const persistor = persistStore(store)

export type RootState   = ReturnType<typeof store.getState>

export default {store, persistor};