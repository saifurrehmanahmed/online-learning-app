import React, { useState, useEffect } from "react";
import { Dimensions } from 'react-native'


export default useOrientation = () => {
    const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'))
    useEffect(() => {
        const onChange = (result) => {
            setScreenInfo(result)
        }
        Dimensions.addEventListener('change', onChange)

        return () => Dimensions.removeEventListener('change', onChange)
    }, [])
    return {
        ...screenInfom,
        isPortrait: screenInfo.height > screenInfo.width

    }

}