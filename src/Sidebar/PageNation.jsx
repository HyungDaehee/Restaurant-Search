// PaginationComponent.jsx
import React from 'react';
import Pagination from 'react-js-pagination';
import './PageNation.scss'

const PageNation = ({ activePage, itemsCountPerPage, totalItemsCount, onChange }) => {
    return (
        <Pagination
        activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={onChange}
                innerClass="pagination-list"  // 페이지 번호 리스트의 클래스
                itemClass="page"              // 각 페이지 번호의 클래스
                linkClass="page-link"         // 링크 클래스
                activeLinkClass="active"      // 활성화된 페이지 링크 클래스
                prevLinkClass="move"          // 이전 링크 클래스
                nextLinkClass="move"          // 다음 링크 클래스
        />
    );
};

export default PageNation;
