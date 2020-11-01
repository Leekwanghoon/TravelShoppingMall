import React,{ useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
function ProductImage(props) {

    const [Images, setImage] = useState([])
    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map((item,inex) => {
                images.push({
                    //실제로는 경로 dynamic하게 처리한다
                    original:`http://localhost:5000/${item}`,
                    thumbnail:`http://localhost:5000/${item}`
                })
            })
            setImage(images);
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
