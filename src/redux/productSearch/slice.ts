import {createSlice,PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
    loading: boolean;
    error:string | null;
    data:any; //产品细节
    pagination: any;
}

const initialState : ProductSearchState = {
    loading:true, 
    error: null,
    data:null,
    pagination:null,
}

export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct", //slice name/acion name
    async (paramaters: {
        keywords: string, 
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI) => { 
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`
        if (paramaters.keywords){
            url += `&keyword=${paramaters.keywords}`;
        }
        const response = await axios.get(url);
        return {
            data:response.data,
            pagination: JSON.parse(response.headers['x-pagination'])
        } 
    }
)

export const productSearchSlice = createSlice({
    name:'productSearch', //命名空间
    initialState, //强制定义初始化数据

    reducers: { 
    },
    //NOTE3：slice里处理异步函数getProductDetail自动生成的是三个actions：pending，fullfilled，rejection
    extraReducers:{
        [searchProduct.pending.type]: (state) =>{ 
            //return { ...state, loading:true  } 原写法
            state.loading= true; //immue框架, 直接改变state，底层原理相同，由框架执行
         },
         [searchProduct.fulfilled.type]: (state, action) => { 
            state.data = action.payload.data; 
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
         },
         [searchProduct.rejected.type]: (state,action: PayloadAction<string | null>) => { 
            const ddd = action.payload;
            state.loading = false;
            state.error = action.payload;
         }
    }
})
