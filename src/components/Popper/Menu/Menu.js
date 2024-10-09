import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    // hideOnclick =false: Không ẩn menu khi click vào avatar
    //defaultFn là function trống trên nhé
    //items = []: dữ liệu đã có bên src\layouts\components\Header\Header.js
    const [history, setHistory] = useState([{ data: items }]); //bản chất data này là items thôi
    const current = history[history.length - 1]; //lấy phần tử cuối

    const renderItems = () => {
        return current.data.map((item, index) => {
            //chọc data khác gì items đâu
            const isParent = !!item.children; //mục đích kiểm tra có children trong object không

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]); //khi onClick mà ok nó lại set lại và const current = history[history.length - 1]; tức lấy là phần tử cuối
                        } else {
                            onChange(item); //xem trong src\layouts\components\Header\Header.js
                        }
                    }}
                /> //onClick ở đây là một cách bạn tự định nghĩa hành động mà bạn muốn xảy ra khi sự kiện nhấn chuột xảy ra trên thành phần MenuItem
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    }; //quay lại một cấp độ trong lịch sử danh sách mục bằng cách cắt bỏ phần tử cuối cùng khỏi state history

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {/* Áp dụng PropTypes vào dự án: ban đầu title = 'language'; sửa lại như dưới */}
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                {/* Xử lý thanh cuộn trong menu đa cấp, khi có nhiều content  */}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    }; //để khi vào trang khác khi onlick, thoát hover về lại trang đầu

    return (
        //không có visible: không sử dụng visible cho phép Tippy.js xử lý tự động các sự kiện hover, giúp cho việc tương tác trở nên mượt mà hơn
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]} //thường dùng để xác định vị trí hoặc khoảng cách giữa các phần tử
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleReset}
            //để trả về trang đầu khi bỏ hover; xong hover lại
            //Gọi hàm handleReset khi tooltip bị ẩn. Điều này có thể dùng để reset lại trạng thái của trang hoặc phần tử nào đó
        >
            {children}
        </Tippy>
    );
}

// Áp dụng PropTypes vào dự án
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
