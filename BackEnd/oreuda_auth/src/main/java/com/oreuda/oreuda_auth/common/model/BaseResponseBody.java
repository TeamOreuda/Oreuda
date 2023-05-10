package com.oreuda.oreuda_auth.common.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponseBody {
    String message;
    Integer status;

    public BaseResponseBody() {
    }

    public BaseResponseBody(Integer status) {
        this.status = status;
    }

    public BaseResponseBody(String message, Integer status) {
        this.message = message;
        this.status = status;
    }

    public static BaseResponseBody of(String message, Integer status) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.status = status;
        return body;
    }
}
