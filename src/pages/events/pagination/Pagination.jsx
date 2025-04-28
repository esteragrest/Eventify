import PropTypes from "prop-types";
import styles from './pagination.module.css'
import { PaginationButton } from "./pagination-button/PaginationButton";

export const Pagination = ({ page, lastPage, setPage }) => {
    const renderPageNumbers = () => {
        let pages = [];
        const startPage = Math.max(page - 2, 2);
        const endPage = Math.min(page + 2, lastPage - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationButton
                    key={i}
                    isActive={page === i}
                    onClick={() => setPage(i)}
                >
                    {i}
                </PaginationButton>
            );
        }

        return pages;
    };

    const showLeftEllipsis = Math.max(page - 2, 2) > 2;
    const showRightEllipsis = Math.min(page + 2, lastPage - 1) < lastPage - 1;

    return (
        <div className={styles['pagination-container']}>
			<PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>
				<img src="/public/img/arrow-back.svg" alt="arrow-back" />
			</PaginationButton>
            <PaginationButton isActive={page === 1} disabled={page === 1} onClick={() => setPage(1)}>1</PaginationButton>
            {showLeftEllipsis && <p>...</p>}
            {renderPageNumbers()}
            {showRightEllipsis && <p>...</p>}
            <PaginationButton isActive={page === lastPage} disabled={page === lastPage} onClick={() => setPage(lastPage)}>
                {lastPage}
            </PaginationButton>
            <PaginationButton disabled={page === lastPage} onClick={() => setPage(page + 1)}>
                <img src="/public/img/arrow-next.svg" alt="arrow-next" />
            </PaginationButton>
        </div>
    );
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired
}
