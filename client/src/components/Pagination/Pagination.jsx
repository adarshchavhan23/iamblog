import React from 'react'
import './Pagination.scss'

const Pagination = ({ page, setPage, totalPages, setPageSize }) => {
    return (
        <div className="pagination">
            <div className='left'>
                <div className="field-wrapper">
                    <button onClick={() => 1 < page && setPage(page => Number(page) - 1)}>prev</button>
                    <input type='number' min={1} max={totalPages} onKeyDown={e => {
                        const value = e.target.value;
                        if (e.key === 'Enter') {
                            (value >= 1 && value <= totalPages) && setPage(value);
                        }
                    }} />

                    <button onClick={() => page < totalPages && setPage(page => Number(page) + 1)}>next</button>
                </div>
                <div className="text">{page} of {totalPages}</div>
            </div>
            <div className='right'>
                <span>No of posts</span> <input type='number' min={1} max={50} onKeyDown={e => {
                    const value = e.target.value;
                    if (e.key === 'Enter') {
                        (value >= 1 && value <= 50) && setPageSize(value);
                    }
                }} />
            </div>
        </div>
    )
}

export default Pagination