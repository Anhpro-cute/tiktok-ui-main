import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    }; //cái passProps để dùng với target="_blank" tái sử dụng chứ bài học này không dùng tới

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    } //để khi nút bị disabled; onClick không hoạt động... hay
    //khi một component ở trạng thái disabled, nó sẽ không phản hồi với bất kỳ sự kiện nào

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        //khi có className nó truyền giá trị vào đây;
        //nếu className chứa một giá trị như "active", thì [className] sẽ tương đương với "active"
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        //cái props để phân giải để dùng target="_blank" chứ bài này k dùng
        //cái leftIcon, rightIcon để muốn có icon vào chữ không, bài này k cần
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

// Áp dụng PropTypes vào dự án
Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
