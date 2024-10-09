// Xây dựng UI phần Header #7
//Giải quyết vấn đề ảnh có thể lỗi
//Nếu để thẻ img bình thường thì không cần file này; do Image là component nên có file này; muốn dùng ref phải dùng forwardRef
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

// customFallback là tên biến mà bạn sử dụng trong component để đại diện cho giá trị của thuộc tính fallback
// nếu không truyền giá trị cho fallback ở component cha thì customFallback = fallback = images.noImage
// nếu truyền giá trị cho fallback thì; thì customFallback = fallback = giá trị truyền vào; nếu src không có ảnh kích hoạt onError={handleError}
// lưu ý fallback trong useState dưới không phải là fallback: customFallback; mà fallback trong fallback: customFallback đã đổi tên thành customFallback
const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback); //do muốn thêm fallback vào component cha muốn truyền; không thì đã truyền setFallback(images.noImage);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src} //đầu tiên nó vẫn cái link ở src do fallback =''; nếu src không có ảnh: onError={handleError}
            alt={alt}
            {...props}
            onError={handleError} //nếu lỗi không có ảnh nó sẽ xử lý hàm này
        />
    );
});

// Áp dụng PropTypes vào dự án
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
