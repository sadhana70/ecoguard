import { Products } from './components/products';
import contents from './content';

export default function Card() {
    return (
        <div className='App'>
            {contents.map(contents => (
                <Products
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}

                />
            ))}
        </div>
    )
}
