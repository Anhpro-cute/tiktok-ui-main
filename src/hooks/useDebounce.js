// Xây dựng Logic phần Header #3
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value); //nhớ là initial chỉ lấy 1 lần đầu thôi

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay); //cập nhật debouncedValue sau một khoảng thời gian delay

        // giúp ngăn chặn việc cập nhật state khi component đã không còn tồn tại hoặc khi giá trị đã thay đổi
        // sẽ hủy bỏ bất kỳ timer nào đã được thiết lập trước đó.
        // Điều này có nghĩa là nếu người dùng gõ tiếp và timer chưa hết hạn, timer cũ sẽ không còn hiệu lực
        // trong 500 ms(ở ví dụ này): chưa chạy setTimeout nó sẽ bị xóa nếu gõ ký tự mới
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue; // chỉ khi nào ngừng gõ khoảng thời gian delay mới có giá trị mới; không ngừng gõ vần là chuỗi rỗng
}

export default useDebounce;
