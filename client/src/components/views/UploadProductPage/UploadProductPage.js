import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

// 대륙 정보
const Continent = [
    {
        key: 1,
        value: "Africa"
    },
    {
        key: 2,
        value: "Europe"
    },
    {
        key: 3,
        value: "Asia"
    },
    {
        key: 4,
        value: "North America"
    },
    {
        key: 5,
        value: "South America"
    },
    {
        key: 6,
        value: "Australia"
    },
    {
        key: 7,
        value: "Antarctica"
    }
]


function UploadProductPage(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const nameChangeHandler = e => {
        const { value } = e.target;
        setName(value);
    }

    const descriptionChangeHandler = e => {
        const { value } = e.target;
        setDescription(value);
    }

    const priceChangeHandler = e => {
        const { value } = e.target;
        setPrice(value);
    }

    const continentChangeHandler = e => {
        const { value } = e.target;
        setContinent( value );
    }

    const updateImages = (newPath) => {
        setImages(newPath);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if( !name || !description || !price || !continent || !images) {
            return alert("모든 값을 입력해주세요.");
        }

        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            writer: props.user.userData._id,
            title: name,
            description: description,
            price: price,
            continent:continent,
            images: images
        }
        
        Axios.post("/api/product", body)
            .then(response => {
                if( response.data.success) {
                    alert("상품 업로드에 성공해부럿");
                    props.history.push('/');
                } else {
                    alert("상품 업로드에 실패!");
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload
                    refreshFunction={updateImages}
                />


                <br />
                <br />
                <label>이름</label>
                <Input
                    onChange={nameChangeHandler}
                    value={name}
                    placeholder="너 이름이 뭐니?"
                />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={description}
                    placeholder="textArea를 입력해랑"
                />
                <br />
                <br />
                <label>가격($)</label>
                <Input
                    type="number"
                    onChange={priceChangeHandler}
                    value={price}
                />
                <br />
                <br />
                <select
                    onChange={continentChangeHandler}
                    value={continent}
                >
                    {Continent.map(continent => (
                        <option
                            key={continent.key}
                            value={continent.key}
                        >
                            {continent.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>
        </div>
    )
}

export default UploadProductPage
