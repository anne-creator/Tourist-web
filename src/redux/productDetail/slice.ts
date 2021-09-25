// slice 自动包含reducer 和 action的映射关系，代替action.ts 和reducer.ts
// slice相当于reducer store中分割出来的子模块，和reducer功能相似

/**createAsyncThunk
 * NOTE1:引入createAsyncThunk
 * NOTE2:创建createAsyncThunk
 * NOTE3：slice里处理异步函数getProductDetail自动生成的是三个actions：pending，fullfilled，rejection
 */
 
//NOTE1:引入createAsyncThunk
import {createSlice,PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
    loading: boolean;
    error:string | null;
    data:any; //产品细节
}

const initialState : ProductDetailState = {
    loading:true, 
    error: null,
    data:null
}

/** NOTE2:创建thunk action 通过 createAsyncThunk。
 * 接受参数：1.命名空间加上crateAsync的名字; 2. async 异步函数：放入主要函数逻辑（API获取），return一个promise
 * 此时，getProductDetail 函数会自行生成pending，fullfilled，rejection这三个action，放到slice里处理
 * 不需要任何控制流的操作，三个action都解决了。
*/
export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail", //slice name/acion name
    async (touristRouteId: string, thunkAPI) => { // builin solution，包含redux相关功能：dispatch，getState获得store数据
        // setLoading(true);rtk前
        // NOTE4：useEffect 中分别发送三个action
            const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
            return data; //data 是一个promise，结果不确定
    }
)

export const productDetailSlice = createSlice({
    name:'productDetail', //命名空间
    initialState, //强制定义初始化数据
    /* Reducer explain
    *1.捆绑action和Reducer，不需要单独定义action.
    *2. reducer是一个对象，不是过程。（原reducer file是一个过程，不处理sideEffect.
    *3.不需要写switch语句
    */
    reducers: { 
        //  /* 第一个action, 后面接她的处理函数，也就是reducer。参数是当前state 
        //  处理API请求开始*/
        //  fetchStart: (state) =>{ 
        //     //return { ...state, loading:true  } 原写法
        //     state.loading= true; //immue框架, 直接改变state，底层原理相同，由框架执行
        //  },
        //  fetchSuccess: (state, action) => { //action类型被RTK定义好了，鼠标hover可以看见
        //     state.data = action.payload; 
        //     state.loading = false;
        //     state.error = null;
        //  },
        //  fetchFail: (state,action: PayloadAction<string | null>) => { //自行定义action见NOTE1
        //     const ddd = action.payload;
        //     state.loading = false;
        //     state.error = action.payload;
        //  }
    },
    //NOTE3：slice里处理异步函数getProductDetail自动生成的是三个actions：pending，fullfilled，rejection
    extraReducers:{
        [getProductDetail.pending.type]: (state) =>{ 
            //return { ...state, loading:true  } 原写法
            state.loading= true; //immue框架, 直接改变state，底层原理相同，由框架执行
         },
         [getProductDetail.fulfilled.type]: (state, action) => { 
            state.data = action.payload; 
            state.loading = false;
            state.error = null;
         },
         [getProductDetail.rejected.type]: (state,action: PayloadAction<string | null>) => { 
            const ddd = action.payload;
            state.loading = false;
            state.error = action.payload;
         }
    }
})


//|||||||||||||||||||extra knowledge:||||||||||||||||||||||||||||

//NOTE1:payloadAction:自定义action的payload类型：原本类型已被定义好为any,现在可以自定义为、
// import {PayloadAction} from '@reduxjs/toolkit';
// fetchSuccess: (state, action： PayloadAction<string|null>) => { //action payload类型自定义/

