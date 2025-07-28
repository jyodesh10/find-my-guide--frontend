import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ImgInput from "../../components/ImgInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import TileInputCom from "../../components/TitleInputCom";
import baseUrl from "../../constants/constants";
import { showErrorToast, showSuccessToast } from "../../utils/CustomToasts";

export const AddTour = () => {
    const [imgs, setimgs] = useState([]);
    const [guide, setGuide] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [itinerary, setitinerary] = useState("");
    const [price, setprice] = useState(0);
    const [duration, setduration] = useState("");
    const [languages, setlanguages] = useState("");
    const [specializations, setspecialization] = useState("");
    const [country, setcountry] = useState("");
    const [region, setregion] = useState("");
    const [city, setcity] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [loading, setloading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
        setGuide(id);
    }, [])

    const postTour = async ()  => {
        try {
            setloading(true);
            const formData = new FormData();
            formData.append('guide', guide);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('itinerary', itinerary);
            formData.append('price', price);
            formData.append('highlights.duration', duration);
            formData.append('highlights.languages', ["English"]);
            formData.append('highlights.specializations', ["scenic", "Nature"]);
            formData.append('highlights.location.country', country);
            formData.append('highlights.location.region', region);
            formData.append('highlights.location.city', city);

            imgs.forEach((__, index) => {
                formData.append('image', imgs[index])
            })

            const config = {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            };
            
            const response = await axios.post(baseUrl + "api/tours", formData, config);

            if (response.status === 201 || response.status === 200) { // 201 Created is also a success for POST
                navigate(-1);
                showSuccessToast("Tour added successfully!");
                setloading(false);
                settitle("");
                setdescription("");
                setimgs([]);
                setitinerary("");
                setprice(0);
                setduration("");
                setcountry("");
                setregion("");
                setcity("");
                setlanguages("");
                setspecialization("");
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error posting tour:", error);
            if (error.response) {
                showErrorToast(error.response.data.message);
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                showErrorToast(error.request);
                console.error("Request:", error.request);
            } else {
                showErrorToast(error.message);
                console.error('Error', error.message);
            }
        } finally {
            setloading(false);
        }
    }

    function deleteSelectedImg(name) {
        // setimgs(imgs => imgs.filter((img) => img.name == name))
        const newimgs = imgs.filter((img) => img.name !== name)
        setimgs(newimgs)
    }
    
    if(loading) {
        return (
            <LoadingSpinner/>
        )
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
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />
                <TileInputCom
                    label={"Description"}
                    islong={true}
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
                <TileInputCom
                    label={"Itinerary"}
                    islong={true}
                    value={itinerary}
                    onChange={(e) => setitinerary(e.target.value)}
                />
                <TileInputCom
                    label={"Price"}
                    value={price}
                    type="number"
                    onChange={(e) => setprice(e.target.value)}
                />
                <h1 className="mb-2 text-lg font-semibold">Highlights</h1>
                <div className="flex items-center justify-between">
                    <TileInputCom
                        label={"Duration"}
                        value={duration}
                        onChange={(e) => setduration(e.target.value)}
                    />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"Languages"}
                        value={languages}
                        onChange={(e)=> setlanguages(e.target.value)}
                        />
                </div>
                <TileInputCom
                    label={"Specialization"}
                    value={specializations}
                    onChange={(e)=> setspecialization(e.target.value)}
                />
                <h1>Location</h1>
                <div className="flex items-center justify-between">
                    <TileInputCom
                        label={"Country"}
                        islabel={false}
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                        />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"Region"}
                        islabel={false}
                        value={region}
                        onChange={(e) => setregion(e.target.value)}
                        />
                    <div className="w-10"/>
                    <TileInputCom
                        label={"City"}
                        islabel={false}
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
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
                                onClick={() => {deleteSelectedImg(img.name)}}
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
                    <button 
                        className='w-[25%] min-w-[80px] h-10 bg-blue-600 rounded-md text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:shadow-blue-400/50'
                        onClick={postTour}
                    >
                        Add Tour
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};
