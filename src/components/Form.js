import React,{useState} from 'react';
import Input from './Input';
import Button from './Button';

const Form = (props) => {
    const [collectingUserInfo, setCollectingUserInfo] = useState({})
    return (
        <form className="form" onSubmit={(e) => {
            props.handleSubmit(e,collectingUserInfo);
        }}>
            <label className="label">
                <p>Name</p> 
                <Input onChange={(e) => {setCollectingUserInfo({...collectingUserInfo, name: e.target.value})}} type={'text'} placeholder={'Name'}/>
            </label>
            <label className="label">
                <p>Number</p>
                <Input onChange={(e) => {setCollectingUserInfo({...collectingUserInfo, phone: e.target.value})} } type={'number'} placeholder={'Phone number'}/>
            </label>
            <Button className={'btn-add'} type="submit" name={'Add new'}/>
        </form>
    )
}

export default Form;