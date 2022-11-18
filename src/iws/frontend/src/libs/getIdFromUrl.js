
// TODO: remove this when api shows the id
export default function getIdFromUrl(url, index_from_end = 0) {
    let paths = url.split('/').filter(_ => _)
    return paths[paths.length - 1 - index_from_end]
}

