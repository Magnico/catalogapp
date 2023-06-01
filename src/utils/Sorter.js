function parseSortOptions(orderString){
    const directionMarker = '-na';
    const offset = orderString.startsWith(directionMarker)? directionMarker.length : 0;
    const keyName = orderString.slice(offset);
    const sortOptions = {
        key: keyName,
        direction: offset === 0 ? 1 : -1
    }

    return sortOptions;
}

function parseDate(dateString){
    const separator = '/';
    return new Date(dateString.split(separator).reverse().join(separator))
}

function sortByName(data, direction){
    data.sort((a,b) => direction * a.name.localeCompare(b.name));
}

function sortByDate(data, direction){
    data.sort((a,b) => direction * (parseDate(a.first_brewed) - parseDate(b.first_brewed)));
}

const sorters = {
    'name': sortByName,
    'date': sortByDate
}

function orderResult (result, order) {
    const sortOptions = parseSortOptions(order);
    sorters[sortOptions.key]?.(result, sortOptions.direction);
    return result;
}

export { orderResult }