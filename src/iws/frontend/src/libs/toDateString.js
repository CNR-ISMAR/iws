import moment from 'moment';

export function toDateString(d) {
    if (!d) {
        return ''
    }

    return moment(d).format('DD/MM/YYYY')
}


export function toDateTimeString(d) {
    if (!d) {
        return ''
    }

    return moment(d).format('DD/MM/YYYY HH:mm')
}
