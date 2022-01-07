import React from "react";
import { Pagination } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import {LinkContainer } from 'react-router-bootstrap'




function Paginate(){
    const { keyword, page } = useParams()
    
    const { pages, pageNum } = useSelector(state => state.productList)

    return <>{
        pages > 1 && 
        <Pagination>
            <LinkContainer to={keyword ? `/search/${keyword}/page/${pageNum-1}` : `/page/${pageNum - 1}`}>
            <Pagination.Prev disabled={pageNum === 1 && true}/>
            </LinkContainer>
            {[...Array(pages).keys()].map((p, index)=>{
                return <LinkContainer to={keyword ? `/search/${keyword}/page/${p+1}` : `/page/${p+1}`} key={index}>
                    <Pagination.Item  active={p+1 === Number(page)} >{p + 1}</Pagination.Item>
                </LinkContainer>
            })}
            <LinkContainer to={keyword ? `/search/${keyword}/page/${pageNum+1}` : `/page/${pageNum + 1}`}>
            <Pagination.Next disabled={pageNum === pages && true}/>
            </LinkContainer>
    </Pagination>
        
    }</>
}

export default Paginate