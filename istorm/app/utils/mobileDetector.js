const isMobileOrTablet = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobileOrTablet.Android() || isMobileOrTablet.BlackBerry() || isMobileOrTablet.iOS() || isMobileOrTablet.Opera() || isMobileOrTablet.Windows());
    },
    none: function() {
        return (!isMobileOrTablet.any());
    }
};

export { isMobileOrTablet }