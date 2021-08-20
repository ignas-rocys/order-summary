import React,{useState} from 'react';
import Input from './Input';
import Button from './Button';

const Form = (props) => {
    const [collectingUserInfo, setCollectingUserInfo] = useState({})
    return (
        <form onSubmit={(e) => {
            props.handleSubmit(e,collectingUserInfo);
        }}>
            <label style={{
                display: 'flex',
                flexDirection: 'row',
                height: '20px',
                alignItems: 'center'
            }}>
                <p>Name</p> 
                <Input onChange={(e) => {setCollectingUserInfo({...collectingUserInfo, name: e.target.value})}} type={'text'} placeholder={'Name'}/>
            </label>
            <label style={{
                display: 'flex',
                flexDirection: 'row',
                height: '20px',
                alignItems: 'center'
            }}>
                <p>Number</p>
                <Input onChange={(e) => {setCollectingUserInfo({...collectingUserInfo, phone: e.target.value})} } type={'number'} placeholder={'Phone number'}/>
            </label>
            <Button type="submit" name={'Add new'}/>
        </form>
    )
}

export default Form;