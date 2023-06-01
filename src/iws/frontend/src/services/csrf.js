
export function getCSRF() {
    return document.querySelector('[name="csrfmiddlewaretoken"]').value;
}
