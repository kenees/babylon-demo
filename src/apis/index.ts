import { http, get, post } from '~/utils/requests';

const GetProducts = (data: any) => http.POST({ path: '/usa/aa', data: `${data}` });
const GetBaa = (params: any) => get.apply({ path: '/baa', params });
const GetUser = (data: any) => post.apply({ path: '/usa/aa', data });

export default {
    GetBaa,
    GetUser,
    GetProducts,
};
