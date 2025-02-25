import React from 'react';
import Pagination from 'react-js-pagination';
import usePaginationStore from '../../store/PaginationStore.js';
import useSearchStore from '../../store/SearchStore.js';
import '../../styles/PageNation.scss';

const PageNation = () => {
    const { currentPage, setCurrentPage, itemsPerPage } = usePaginationStore();
    const { searchResults } = useSearchStore();

    return (
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={searchResults.length}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            innerClass="pagination-list"
            itemClass="page"
            linkClass="page-link"
            activeLinkClass="active"
            prevLinkClass="move"
            nextLinkClass="move"
        />
    );
};

export default PageNation;
