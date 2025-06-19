
// state = {
//   img: logo
// }


function ImgInput({onClick}) {
    return (
        <div className="relative h-11 w-full min-w-[200px] mb-25 mt-3">
            <button onClick={onClick}>
                <div className='container flex items-center justify-center h-30 w-30 rounded-md bg-gray-200 border-dotted border-2 border-gray-500'>
                    <h5 className='font-normal text-4xl text-gray-800 '>+</h5>
                </div>
            </button>
        </div>
    )
}

export default ImgInput;