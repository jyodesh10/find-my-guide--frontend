import { useParams } from "react-router-dom";

function Subcategory() {
  const { id } = useParams();
  return (
    <div className="w-screen h-[90vh] justify-items-center bg-slate-800 text-2xl font-normal text-white p-8">
      <h1>This is the category page for product {id}</h1>
    </div>
  )
}

export default Subcategory