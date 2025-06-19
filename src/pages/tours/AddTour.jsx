import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import ImgInput from "../../components/ImgInput";
import TileInputCom from "../../components/TitleInputCom";

export const AddTour = () => {
    const [imgs, setimgs] = useState([]);
    const fileInputRef = useRef(null);

    function deleteEvent(name) {
        // setimgs(imgs => imgs.filter((img) => img.name == name))
        const newimgs = imgs.filter((img) => img.name !== name)
        setimgs(newimgs)
    }

    return (
        <div>
        <div className="mx-[12%] mb-[12%] rounded-lg bg-gray-100">
            <div className="w-full p-8 bg-gray-200  rounded-t-lg">
                <h5 className='font-medium text-3xl text-gray-600'>Add new Tour</h5>
            </div>
            <div className="p-8">
                <TileInputCom
                label={"Title"}
                //   value={title}
                //   onChange={(e) => settitle(e.target.value)}
                />
                <TileInputCom
                    label={"Description"}
                    islong={true}
                />
                <TileInputCom
                    label={"Itinerary"}
                    islong={true}
                />
                <TileInputCom
                    label={"Price"}
                />
                <h1 className="mb-2 text-lg font-semibold">Highlights</h1>
                <div className="flex items-center justify-between">
                    <TileInputCom
                        label={"Duration"}
                    />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"Languages"}
                    />
                </div>
                <TileInputCom
                    label={"Specialization"}
                />
                <h1>Location</h1>
                <div className="flex items-center justify-between">
                    <TileInputCom
                        label={"Country"}
                        islabel={false}
                        />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"Region"}
                        islabel={false}
                        />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"City"}
                        islabel={false}
                    />
                </div>
                <h1>Image</h1>
                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 gap-y-4 overflow-auto ">
                    {imgs.map((img, index) => 
                        <div key={index} className="relative h-[120px] w-[120px] p-1 flex items-center border-dotted border-2 border-gray-400 rounded-lg overflow-hidden">
                            <img 
                                src={URL.createObjectURL(img)} 
                                alt={img.name} 
                                className=" object-contain"
                            />
                            <button 
                                className="absolute top-1 right-1 rounded-full px-1 py-1 border-2 border-gray-400 text-gray-400 text-[15px] hover:text-red-700 hover:border-red-700"
                                onClick={() => {deleteEvent(img.name)}}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    )}
                </div>
                <ImgInput onClick={() => {fileInputRef.current.click()}}/>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    multiple
                    onChange={(e) => {
                        setimgs(Array.from(e.target.files))
                    }}
                    className="hidden"
                />
                <label htmlFor="">Upload Images</label>
                <div className='flex justify-end items-end'>
                    <button className='w-[25%] min-w-[80px] h-10 bg-blue-600 rounded-md text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:shadow-blue-400/50'
                        // onClick={postBlog}
                    >
                        Add Tour
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};
