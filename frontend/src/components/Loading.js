import React from 'react'
import {Spinner} from 'react-bootstrap'


function Loading( {w, h} ){
    return (
    <Spinner animation="border" role="status" style={{width: w, height:h, margin : 'auto', display: 'block'}}>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    );
    

}

Loading.defaultProps = {
    w: '5rem',
    h: '5rem'
}


export default Loading