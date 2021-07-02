import ajax from '@youzan/zan-h5-ajax';

class Request {
  ajax(options) {
    return ajax({
      withCredentials: true,
      contentType: 'application/json; charset=utf-8',
      data: options.data,
      ...options
    })
      .then(res => {
        if (res.code !== undefined) {
          // business success
          if (res.code === 0 || res.code === 200) {
            return Promise.resolve(res.data);
            // business error
          }
          const err = {
            code: res.code,
            msg: res.msg || res.messag,
          }
          return Promise.reject(err);

        }

        // open gateway error
        if (res.gw_err_resp !== undefined) {
          const errReject = {
            code: res.gw_err_resp.err_code,
            msg: res.gw_err_resp.err_msg
          }
          return Promise.reject(errReject);
        }

        return Promise.resolve(res);
      })
      .catch(err => {
        const errReject = {
          code: err.code,
          msg: err.msg || err.message || '网络错误，请稍后再试'
        }
        return Promise.reject(errReject);
      });
  }

  jsonp(options) {
    return this.ajax({
      dataType: 'jsonp',
      ...options
    });
  }
}

['post', 'get', 'delete', 'put'].forEach(method => {
  Request.prototype[method] = function (options) {
    return this.ajax({
      method,
      ...options
    });
  };
});

const Ajax = new Request();

export { Ajax };

export default new Request();
