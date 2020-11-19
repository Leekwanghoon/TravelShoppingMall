import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from '../NavBar/Sections/CheckBox';
import { continents } from '../NavBar/Sections/Datas';
import { price } from '../NavBar/Sections/Datas';
import RadioBox from '../NavBar/Sections/RadioBox';
import SearchFeature from '../NavBar/Sections/SearchFeature';
function LandingPage() {


    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [postSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continent: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("");

    //데이터 가져오기
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body);
    }, [])


    //공통되는 부분이라 데이터 빼놓음
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize);
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.");
                }
            })
    }

    // 랜딩페이지 카드 가져오기
    const renderCards = Products.map((product, index) => {
        // console.log("Product", product);
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`}>
                    <ImageSlider images={product.images} />
                    </a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    //더보기 버튼
    const loadOnMoreHandler = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body);
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for( let key in data ) {
            // data[key]하면 key: value에서 value값 꺼냉모
            if ( data[key]._id === parseInt(value, 10)) {
                array = data[key].array; // [200,249]
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }
        //price아니면 continents를 가리킴
        newFilters[category] = filters

        if( category === "price" ) {
            let priceValues = handlePrice(filters) // array가 들어가
            newFilters[category] = priceValues; // ["price"] = []
        }

        showFilteredResults(newFilters)
        setFilters(newFilters);
    }

    const updateSearchTerm = (newSearchTerm) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm : newSearchTerm
        }
        setSkip(0);
        setSearchTerm(newSearchTerm)
        getProducts(body);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere</h2>
            </div>
            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continent")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>


            {/* Search */}
            <div style={{ display:'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>
            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>


            {postSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem auto' }}>
                    <button onClick={loadOnMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
