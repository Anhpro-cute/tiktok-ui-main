import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
} //className là giá trị menu-popper của className={cx('menu-popper') trong src\components\Popper\Menu\Menu.js

// Áp dụng PropTypes vào dự án
Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
