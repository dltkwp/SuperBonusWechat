let msg = function (title, icon, image, duration, success, fail) {
    icon = icon || 'none';
    duration = duration || 2000;
    wx.showToast({
        title: title,
        icon: icon,
        image: image,
        duration: duration,
        mask: false,
        success: success,
        fail: fail
    });
}

const warn = function (content) {
    msg(content, 'none', '../../images/warn.png', 0, function () {}, function () {});
}

const error = function (content) {
    msg(content, 'none', '../../images/error.png', 0, function () {}, function () {});
}

const success = function (content) {
    msg(content, 'success', '', 0, function () {}, function () {});
}



module.exports = {
    error: error,
    warn: warn,
    success: success
}