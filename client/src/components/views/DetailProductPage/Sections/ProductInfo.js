import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
function ProductInfo(props) {

    const dispatch = useDispatch();
    const { price, description, views, sold, _id } = props.detail

    const clickHandler = () => {
        // 필요한 정보를 Cart에다가 넣어준다.
        dispatch(addToCart(_id))
    
    }
    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{sold}</Descriptions.Item>
                <Descriptions.Item label="View">{views}</Descriptions.Item>
                <Descriptions.Item label="Description">{description}</Descriptions.Item>
            </Descriptions>
            
            <br />
            <br />
            <br />
            <div style={{ display:'flex', justifyContent:'center'}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>

        </div>
    )
}

export default ProductInfo
