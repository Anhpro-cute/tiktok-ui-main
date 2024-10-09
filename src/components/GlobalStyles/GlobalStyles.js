import PropTypes from 'prop-types';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
    // return React.Children.only(children); //chỉ chấp nhận 1 children; bài này không cần
}

// Áp dụng PropTypes vào dự án
GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
