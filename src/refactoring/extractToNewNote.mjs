import { Section } from "./enumerations.mjs";
import { splitOnOccurrence, recursiveMap } from '../util/listRelated.mjs';
// import { App, Editor, Vault } from "obsidian";

// /**
//  * Summary: To extract out the sections to new notes and then link back to the original.
//  * Reference: docs/extracting-to-new-notes.md
//  * 
//  * @param {number} sectionLevelToExtract Section enumeration
//  * @param {number} sectionLevelToExtractFrom Section enumeration
//  */
// export default async function extractToNewNote(sectionLevelToExtract, sectionLevelToExtractFrom) {

//     /**
//      * Summary: Extracts the sections to new notes and then link back to the original.
//      * 
//      * @param {App} app Obsidian app
//      * @param {Editor} editor Obsidian editor
//      * @param {Vault} vault Obsidian vault
//      */
//     return async function( app, editor, vault ) {
        
//     }
// };

/**
 * Summary: Convert the text into a hierarchy of sections.
 * 
 * @param {String} text 
 */
export function toSectionHierarchy( text ) {
    const lines = text.split( /\r?\n/ );

    console.log( Section.document );

    /**
     * Reference: docs/considerations-for-why-line-section-split-works.md
     */
    const documentSection = parseSection( Section.document, lines );
    return documentSection;
}

/**
 * 
 * @param {string} text 
 * @returns {boolean}
 */
function isHeading( text ) { 
    return /^#+ /.exec( text ); 
}

/**
 * Summary: Returns the heading level.
 * 
 * @param {string} text 
 * @returns {number}
 */
function headingLevel( text ) {
    if( isHeading( text ) ) {
        return text.indexOf( ' ' );
    } else {
        return -1;
    }
}

/**
 * Summary: |
 *      Checks if the provided heading level is more significant 
 *      (lower number) than the passed in text.
 * 
 * @param {number} level 
 * @param {string} text 
 * @returns {boolean}
 */
function isSameOrLowerLevel( level, text ) {
    const textLevel = headingLevel( text );
    return textLevel >= 0 &&  textLevel <= level;
}

/**
 * Summary: Parse the text at the current level
 *
 * @param {number} sectionLevel 
 * @param {string[]} remainingLines 
 * @returns  {any}
 */
export function parseSection( sectionLevel, remainingLines ) {
    if( remainingLines.length == 0 ) {
        return {
            sectionLevel,
            title: '',
            lines: [],
            sections: [],
        }
    }

    let title = "";
    const firstLine = remainingLines[ 0 ];
    const isDocumentLevelSoNoTitleNeeded = 
        sectionLevel == Section.document && !isHeading( firstLine );
    const headingTester = (line, idx) => idx > 0 && isHeading( line );
    const [lines, sectionLines] = splitOnOccurrence( headingTester, remainingLines );

    if( !isDocumentLevelSoNoTitleNeeded) {
        title = firstLine.replace( /^#+ /, '' ).trim();
        lines.shift();
    }

    const nextLevelDown = sectionLevel + 1;
    const levelTester = text => isSameOrLowerLevel( nextLevelDown, text )
    const breakOnEquivalentSections = lines => splitOnOccurrence( (line, idx) => levelTester( line ) && idx > 0, lines )
    const sectionStrings = recursiveMap( breakOnEquivalentSections, sectionLines );
    const sections = sectionStrings.map( it => parseSection( it[ 0 ].indexOf( ' ' ), it ) )

    return { sectionLevel, title, lines, sections, }
}
