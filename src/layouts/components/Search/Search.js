// Xây dựng Logic phần Header #1:
// tách Search từ src\layouts\components\Header\Header.js; xây dựng lại; bê nhiều cái import từ Header.js sang đây
import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks'; // Xây dựng Logic phần Header #3
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState(''); // Xây dựng Logic phần Header #1: làm two way binding
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false); // Xây dựng Logic phần Header #1
    const [loading, setLoading] = useState(false); // Xây dựng Logic phần Header #2

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef(); // Xây dựng Logic phần Header #1

    useEffect(() => {
        // Xây dựng Logic phần Header #1
        // Xây dựng Logic phần Header #2
        if (!debouncedValue.trim()) {
            //vẫn chưa hiểu lý do viết !debouncedValue vẫn đúng: ban đầu viết như này và có là do ban đầu nó nhận giá trị là ''
            //trim(): Phương thức này loại bỏ các khoảng trắng ở đầu và cuối chuỗi: giả sử nhập dấu cách vào input; tránh tạo chuỗi rỗng
            setSearchResult([]); //để xóa ký tự cuối cùng trong ô input thì phải mất trong fetch; chú ý cái return quan trọng: API sẽ không được gọi nữa
            return; //
        }

        // C1: đã có ở bài học trước
        // Tìm hiểu và sử dụng thư viện Axios
        // C2: dùng thư viện Axios
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    // Xây dựng Logic phần Header #1
    const handleClear = () => {
        setSearchValue(''); //để mất chữ không input
        setSearchResult([]); //xóa luôn kết quả tìm kiếm
        inputRef.current.focus(); // để khi clear chữ khi ấn vào x; nó sẽ focus lại ô input
    };

    // Xây dựng Logic phần Header #1: xử lý sự kiện khi người dùng nhấp chuột bên ngoài một tooltip hoặc popover để đóng nó
    const handleHideResult = () => {
        setShowResult(false);
    };

    // Xây dựng Logic phần Header #1
    // Sửa lỗi và hoàn thiện phần Header #1
    const handleChange = (e) => {
        // Xây dựng Logic phần Header #1
        const searchValue = e.target.value;
        // Không cho nhập ký tự đầu tiên là space trong ô tìm kiếm
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        // Thêm thẻ div bình thường không cần nhưng phải dùng do lỗi Fix warning thư viện Tippy
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult} // Xây dựng Logic phần Header #1
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)} // để khi focus lại vào ô input nó lại hiện cái kết quả tìm kiếm
                    />
                    {!!searchValue && // Xây dựng Logic phần Header #1
                        !loading && ( // có Value; không có loading nó mới hiển thị dấu x
                            <button className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                    {/* // Xây dựng Logic phần Header #2 */}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}{' '}
                    {/* Bỏ qua hành vi focus vào ô tìm kiếm khi nhấn submit */}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
