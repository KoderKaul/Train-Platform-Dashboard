import React, { useState, useEffect } from "react";


const Clock = () => {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        let timerID= setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => {
            clearInterval(timerID)
        };
    }, []);

    const formatTime = (time) => {
        return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
    }
    return (
        <div className='clock'>
            <h1>{formatTime(time)}</h1>
        </div>
    )
}

export default Clock