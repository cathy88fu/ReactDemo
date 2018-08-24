import axios from 'axios';

const ajax = axios.create({
    baseURL:'/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    /* transformRequest: [(data) => {
        return qs.stringify(data)
    }] */
});

ajax.interceptors.response.use((response) => {
    /* const {
        errno,
        errmsg,
        data,
        servertime
    } = response.data; */
    // 接口正常，返回 { errno, errmsg, data }
    if (response.status >= 200 && response.status < 300) {
        // 接口错误，404、500 等，返回错误
        if (errno == 0) {
            return {
                success: true,
                data,
                servertime
            }
        } else if (handleRedirect[errno]) {
            return handleRedirect[errno](data);
        } else {
            return message.error(errmsg || "接口错误");
        }

    }
}, (err) => {
    // console.log(err.response);
    if (err.response) {
        let code = err.response.status;
        if (code >= 500) {
            console.log(err.response);
            message.error("服务器打盹了~");
        }
    }
    return {
        error: err
    };
});

export default ajax;