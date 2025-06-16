import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="border-gray-300 h-15 w-15 animate-spin rounded-full border-6 border-t-blue-600" />
        </div>
    )
}

export default LoadingSpinner