import React, { useState } from 'react'
import './index.less'

export default function Locker(props: any) {
    const [visible, setValue] = useState(false);

    const handleShowDrawer = () => {
        setValue(!visible);
    }

    const handleClosed = () => {
        setValue(false);
    }

    return (
        <div  >
            <div className='locker_btn-1' onClick={handleShowDrawer} >
                <div>
                    Open
                </div>
            </div>

            <div className='locker_drawer' style={visible ? {} : { display: 'none' }}>

                <div className='locker_header'>
                    <div className='locker_title'>
                        已经完成
                    </div>
                    <div className='locker_btn-2' style={visible ? {} : { display: 'none' }} onClick={handleClosed}>
                        x
                    </div>
                </div>

                <div className='locker_text'>
                    <div className='locker_info'>Some contents...</div>
                    <div className='locker_info'>Some contents...</div>
                    <div className='locker_info'>Some contents...</div>
                </div>



            </div>

        </div>
    )
}