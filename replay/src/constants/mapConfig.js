import * as config from './config';

// 终端map
export const END_TYPE_MAP = {
    0: config.USER_END_TYPE_BROWSWR,
    1: config.USER_END_TYPE_COMPUTER,
    2: config.USER_END_TYPE_MOBILE,
    3: config.USER_END_TYPE_APPLE,
    4: config.USER_END_TYPE_ANDROID
};

// 终端类型text
export const END_TYPE_TEXT = {
    0: config.END_TYPE_TEXT_BROWSWR,
    1: config.END_TYPE_TEXT_COMPUTER,
    2: config.END_TYPE_TEXT_MOBILE,
    3: config.END_TYPE_TEXT_APPLE,
    4: config.END_TYPE_TEXT_ANDROID
};

// 角色字符串
export const USER_ROLE_TYPE_SIGN = {
    0: config.USER_ROLE_STUDENT_SIGN,
    1: config.USER_ROLE_TEACHER_SIGN,
    2: config.USER_ROLE_ASSISTANT_SIGN
};

// 角色text
export const USER_ROLE_TYPE_TEXT = {
    0: config.USER_ROLE_STUDENT_TEXT,
    1: config.USER_ROLE_TEACHER_TEXT,
    2: config.USER_ROLE_ASSISTANT_TEXT
};