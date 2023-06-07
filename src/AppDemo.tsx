import useAsync from './hooks/useAsync';
import { http, get, post } from '~/utils/requests';
import { useState } from 'react';
import { formattedJSON, uuidGen } from './utils';
import Toasts from './components/Toasts';
import { add } from '~/store/slices/toasts';
import { useAppDispatch } from './store/hooks';
import apis from '~/apis';

interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// const uuid = uuidGen();

const App = () => {
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch();

    const { loading, error, value } = useAsync(async () => {
        const result = await http.GET<{ products: Product[] }>();
        if (result.success) {
            return result.pick(['products']).products.map(({ brand, description }) => ({ brand, description }));
        }
        return result;
    }, [count]);

    useAsync(async () => {
        const result1 = await get.apply({ path: '/baa', params: { a: 12 } });
        // const result1 = await post.apply({ path: '/usa/aa', data: { a: 11 } });
        //
        //
        //       if (result.success) {
        //           // return result.pick(['user']).user.map(({ id, name }) => ({ id, name }));
        //       }
        //
        return result1;
    }, []);

    const ping = () => {
        dispatch(
            add({
                id: 111,
                title: '',
                content: 'nihao',
            })
        );
        setCount((v) => v + 1);
        apis.GetUser({ a: 11 }).then((res) => {
            console.log('aaaaaa', res);
        });
    };

    return (
        <>
            <button onClick={ping}>click</button>
            <Toasts />

            <br />

            <br />

            {loading ? (
                'loading ...'
            ) : (
                <>
                    <pre>{formattedJSON(value)}</pre>
                    <br />
                    <br />
                    <pre>{formattedJSON(error)}</pre>
                </>
            )}
        </>
    );
};

export default App;
