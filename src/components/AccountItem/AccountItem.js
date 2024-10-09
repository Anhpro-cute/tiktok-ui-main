import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image'; //Xây dựng Logic phần Header #1
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        // Xây dựng Logic phần Header #2: thay đổi thẻ div thành Link; sửa thêm phần src\config\routes.js
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {/* tick: true thì có tick xanh; false thì không có tick xanh */}
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

// Áp dụng PropTypes vào dự án
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
