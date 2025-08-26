import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { profiledateFormatter } from "../../components/DateFormatter";
import ImgInput from "../../components/ImgInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import TileInputCom from "../../components/TitleInputCom";
import baseUrl from "../../constants/constants";

const Profile = () => {
  const fileInputRef = useRef(null);

  const [guide, setGuide] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [])

  const fetchProfile = async () => {
    try {
        setLoading(true);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        };
        const res = await axios.get(baseUrl + `api/guides/${localStorage.getItem('id')}`, {
            headers: header,
        });
        setGuide(res.data);
        setDocuments(res.data.documents);
        console.log(res.data);
    } catch (error) {
        console.error("Error fetching user:", error); 
    } finally {
        setLoading(false);
    }
  }



  if(loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <div className='mx-10 rounded-2xl bg-white overflow-x-hidden'>
        {/* top row */}
        <div className="flex items-center bg-gray-200 p-6 rounded-2xl">
          {/* profile img */}
          <img src={guide?.image} alt="" className="h-[80px] w-[80px] rounded-full bg-amber-200 mr-10"/>
          <div className="">
            <h1 className="font-medium text-[18px]">
              {guide?.firstname} {guide?.lastname}
            </h1>
            <h1 className="font-normal text-[15px] text-gray-500">{guide?.email}</h1>
          </div>
          {/* verified icon */}
          {
            guide?.verified === true ? (
              <div className="flex ml-auto justify-center items-center">
                <FaCheckCircle className="mr-1.5 text-green-500"/>
                <h1 className="text-green-500">Verified</h1>
              </div>
            )
            :
            (
              <div className="flex ml-auto justify-center items-center">
                <IoIosCloseCircle className="mr-1.5 text-red-500 text-[20px]"/>
                <h1 className="text-red-500">Not verified</h1>
              </div>
            )
          }
        </div>
        {/* bottom row */}
        <div className="mx-20 my-10">
          <h1 className="text-2xl font-medium mb-2">Personal</h1>
          <TileInputCom label={"First Name"} value={guide?.firstname} onChange={(e) => setGuide({...guide, firstname: e.target.value})}/>
          <TileInputCom label={"Last Name"} value={guide?.lastname} onChange={(e) => setGuide({...guide, lastname: e.target.value})} />
          <TileInputCom label={"Phone Number"} type="number" value={guide?.phone} onChange={(e) => setGuide({...guide, phone: e.target.value})}/>
          <TileInputCom label={"Date of Birth"} type="date" value={profiledateFormatter(guide?.dob)} onChange={(e) => setGuide({...guide, dob: e.target.value})}/>
          <TileInputCom label={"Bio"} islong={true} value={guide?.bio} onChange={(e) => setGuide({...guide, bio: e.target.value})}/>
          <h1 className="text-2xl font-medium mb-2">Location</h1>
          <div className="flex gap-4">
            <TileInputCom label={'Country'} value={guide?.location.country} onChange={(e) => setGuide({...guide, location: {...guide?.location, country: e.target.value}})}/>
            <TileInputCom label={'Region'} value={guide?.location.region} onChange={(e) => setGuide({...guide, location: {...guide?.location, region: e.target.value}})}/>
            <TileInputCom label={'City'} value={guide?.location.city} onChange={(e) => setGuide({...guide, location: {...guide?.location, city: e.target.value}})}/>
          </div>
          <h1 className="text-2xl font-medium mb-2">Highlights</h1>
          <TileInputCom label={"Price"} type="float" value={guide?.price.$numberDecimal} onChange={(e) => setGuide({...guide, price: {...guide.price, $numberDecimal: e.target.value}})}/>
          <TileInputCom label={"Languages"}/>
          <TileInputCom label={"Specialization"}/>
          <h1 className="text-2xl font-medium mb-2">Social Links</h1>
          <TileInputCom label={"Facebook"} value={guide?.facebook} onChange={(e) => setGuide({...guide, facebook: e.target.value})}/>
          <TileInputCom label={"Whatsapp"} value={guide?.whatsapp} onChange={(e) => setGuide({...guide, whatsapp: e.target.value})}/>
          <TileInputCom label={"Website"} value={guide?.website} onChange={(e) => setGuide({...guide, website: e.target.value})}/>
          <h1 className="text-2xl font-medium mb-2">Documents</h1>
          {documents?.length <= 0
            ? (
              <h1>
                No douments available. Add documents for verification
              </h1>
            )
            : (
              <div className="flex">
                {
                  documents.map((e, i) => {
                    return (
                      <div key={i} className="relative h-[120px] w-[120px] mr-4 p-1 flex items-center border-dotted border-2 border-gray-400 rounded-lg overflow-hidden">
                        <img src={e} alt="" className="object-contain"/>
                        <button 
                            className="absolute top-1 right-1 rounded-full px-1 py-1 border-2 border-gray-400 text-gray-400 text-[15px] hover:text-red-700 hover:border-red-700"
                            onClick={() => {/* deleteSelectedImg(img.name) */}}
                        >
                            <MdDelete />
                        </button>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          <ImgInput onClick={() => {fileInputRef.current.click()}}/>
          <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              multiple
              onChange={(e) => {
                  // setGuide({...guide, documents: Array.from(e.target.files)})
                  setDocuments((prev) =>[...prev, Array.from(e.target.files)])
              }}
              className="hidden"
          />
          <button 
              className='pr-6 pl-6 pt-1 pb-1 min-w-[90px] mr-[10px] rounded-md bg-blue-600 text-white hover:bg-blue-500'
              onClick={() => console.log(documents)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile