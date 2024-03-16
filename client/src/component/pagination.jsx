import { useNavigate } from "react-router-dom";

export default function Pagination({ paginationOption }) {
    const { currentPage, totalPage } = paginationOption;
    const navigate = useNavigate();

    const pageNumbers = () => {
        let numbers = [];
        for (let x = 1; x <= totalPage; x++) {
            numbers.push(
                <button key={x} className="join-item btn" onClick={() => navigate(`?page[size]=10&page[number]=${x}`)}>{x}</button>
            );
        }
        return numbers;
    };

    return (
        <div className="join flex justify-center">
            <button className="join-item btn" onClick={() => navigate(`?page[size]=10&page[number]=${currentPage > 1 ? currentPage - 1 : 1}`)}>«</button>
            {pageNumbers()}
            <button className="join-item btn" onClick={() => navigate(`?page[size]=10&page[number]=${currentPage < totalPage ? currentPage + 1 : totalPage}`)}>»</button>
        </div>
    );
}
