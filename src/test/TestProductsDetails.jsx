
import { useNavigate, useParams } from "react-router-dom";
function TestProductsDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);
  return (
    <div className="w-screen h-[90vh] justify-items-center bg-black text-2xl font-normal text-white p-8">  
      <div className="justify-items-center">
        <h1>THis is product {id}</h1>
        <button className="p-3 w-100 h-15 bg-amber-300 hover:bg-amber-500" onClick={() => navigate("category")}>Go to category</button>
      </div>
    </div>
  )
}

export default TestProductsDetails