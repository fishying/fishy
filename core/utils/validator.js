import { isLength, isEmail } from 'validator'

export const orNull = (str) => {
    if (
        str === '' ||
        str === null ||
        str === undefined
    )
        return false
    return true
}

export const orUserName = (username) => {
    if (
        !orNull(username) ||
        !isLength(username, { min:0, max: 24 })
    )
        return false
    return true
}

export const orPwd = (pwd) => {
    if (
        !orNull(pwd) ||
        !isLength(pwd, { min:6, max: 18 })
    )
        return false
    return true
}
export const orEmail = (Email) => {
    if (
        !orNull(Email) ||
        !isEmail(Email)
    )
        return false
    return true
}
