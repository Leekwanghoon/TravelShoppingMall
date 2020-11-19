import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setvalue] = useState(0);

    
    const renderRadioBoxLists = () => (
        props.list && props.list.map(value => (
            <Radio
                key={value._id}
                value={value._id}
            >
                {value.name}
            </Radio>
        ))
    )
    // 1개만 클릭되게 만듬
    const handleChange = (e) => {
        setvalue(e.target.value)
        props.handleFilters(e.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="price" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBoxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
