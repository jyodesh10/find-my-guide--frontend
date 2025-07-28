import { Link, useNavigate } from "react-router-dom";
const ProductsData = [
    {
        id: 0,
        name: "Product 1",
        description: "This is product 1",
        price: 100
    },
    {
        id: 1,
        name: "Product 2",
        description: "This is product 2",
        price: 100
    },
    {
        id: 2,
        name: "Product 3",
        description: "This is product 3",
        price: 100
    },
    {
        id: 3   ,
        name: "Product 4",
        description: "This is product 4",
        price: 100
    },
]

function TestProducts() {
    const navigate = useNavigate();
  return (
    <div>
        <div className="w-screen h-[90vh] items-center justify-center flex bg-black text-2xl font-normal text-white">
            {ProductsData.map((product) => {
                return (
                    <Link to={`${product.id}`} key={product.id}>
                        <div key={product.id} className="p-2 h-50 w-50 mr-5 bg-amber-300"/*  onClick={() => navigate(`products`) } */>
                            <h1>{product.name}</h1>
                            <h1>{product.description}</h1>
                            <h1>{product.price}</h1>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default TestProducts