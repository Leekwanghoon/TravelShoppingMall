import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import {Icon} from 'antd';
import axios from 'axios';


function FileUpload(props) {

    const [filePath, setFilePath] = useState([]);

    const deleteHandler = (path) => {
        const currentIndex = filePath.indexOf(path);
        
        let newImages = [...filePath];
        newImages.splice(currentIndex, 1); //현재 array에서 한개 지워라
        setFilePath(newImages);
        props.refreshFunction(newImages);
    }

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file",files[0]);

        axios.post('/api/product/image',formData, config)
            .then(response => {
                if(response.data.success) {
                    //console.log(response.data);
                    setFilePath([...filePath, response.data.filePath])
                    props.refreshFunction([...filePath, response.data.filePath]);
                } else {
                    alert("파일저장하는데 실패했습니다");
                }
            })
    }
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid red',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }} 
                    {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize:'3rem'}} />
                    </div>
                )}
            </Dropzone>
            
            <div style={{ display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                {filePath.map((path,index) => (
                    <div 
                        onClick={() => deleteHandler(path)}
                        key={index}>
                        <img
                            style={{
                                minWidth: '300px',
                                width: '300px',
                                height: '240px'
                            }} 
                            src={`http://localhost:5000/${path}`} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload