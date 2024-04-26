import { Section } from "./enumerations.mjs";

/**
 * Summary: Remaps all of the headings to have the smallest heading be H1
 * 
 * @param {string} text 
 * @returns  {string}
 */
export function normalizeHeadings( text ) {
    const lines = text.split( /\r?\n/ );
    let lowestIndex = Section.h6;

    for( let line of lines ) {
        if (/^#+ /.exec( line )) {
            lowestIndex = Math.min( lowestIndex, line.indexOf( ' ' ) );
        }
    }
    
    const lowerHeading = text => /^#+ /.exec( text ) ? text.slice( lowestIndex - 1 ) : text;
    const remappedLines = lines.map( lowerHeading );
    return remappedLines.join( "\n" );
}
