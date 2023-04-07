import React  from 'react';
import {Typography} from 'antd'
import expenseImage from './expenses_image.jpg'

const MainPage=(props)=>{
    const { Title,Text }=Typography
    
    return(
        <div style={{backgroundImage: `url(${expenseImage})` ,
        height:'100vh',
        marginTop:'0px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(8px)',
        }}>
            {/* <Title style={{backgroundColor:'linen'}}>EXPENSE TRACKING APPLICATION</Title> */}
            
        </div>
    )
}
export default MainPage