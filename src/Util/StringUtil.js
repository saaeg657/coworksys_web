export function restrictALLSpecialKey(props) {

    var re = /[~!@\#$%^&*\()\-=+_']/gi;
    if (re.test(props.value)) {
        props.value = props.value.replace(re, "");
    }
    return props;
}

export function restrictSpecialKeyForEmail(props) {

    var re = /[~\#$%^&*\()\-=+_']/gi;
    if (re.test(props.value)) {
        props.value = props.value.replace(re, "");
    }
    return props;
}

export function stringToDate(props) {
    var str = props.replace('-', "");

    str = str.trim();
    if (str.length == 8) {
        var result = str.substr(0, 4) + "년 " + str.substr(4, 2) + "월 " + str.substr(6, 2) + "일";

        return result;
    }
}

export function parseToByteFormat(props) {
    var result = parseInt(props);
    return result + " KB";
}