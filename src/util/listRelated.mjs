export function splitOnOccurrence( test, list ) {
    if( list.length == 0) {
        return [[], []]
    }

    for( let i = 0; i < list.length; i++ ) {
        if( test( list[ i ], i ) ) {
            return [list.slice( 0, i ), list.slice( i )];
        }
    }

    return [list, []]
}

export function recursiveMap( mapper, list ) {
    if( list.length == 0 ) {
        return [];
    }

    const [returnItem, remainingItems] = mapper( list )
    const flattenedRemaining = recursiveMap( mapper, remainingItems );
    flattenedRemaining.unshift( returnItem );
    return flattenedRemaining;
}
