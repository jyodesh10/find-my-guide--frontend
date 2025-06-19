

const TileInputCom = ({ label, value, disabled = false, onChange, islong = false, islabel = true }) => {

    if (label === "Content" || islong === true) {
        return (
            <div className="relative w-full min-w-[100px] mb-6">
                <h1>{label}</h1>
                <textarea id="message" rows="4" className="block p-3 w-full text-sm rounded-md border border-gray-500"
                    placeholder={label} value={value} onChange={onChange}>

                </textarea>

            </div>
        )
    }

    return (
        <div className="relative w-full min-w-[100px] mb-6">
            { islabel 
                ? <h1>{label}</h1>
                : null
            }
            <input
                className="block w-full h-10 p-3 text-gray-900 border border-gray-500 rounded-md focus:border-amber-300  "
                placeholder={label}
                disabled={disabled}
                value={value}
                onChange={onChange}
            />

        </div>
    )
}


export default TileInputCom;