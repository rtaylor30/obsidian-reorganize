// Basic Refactoring Tests

import { toSectionHierarchy } from '../../../src/refactoring/extractToNewNote.mjs';

const testData = `#tag

# Some Title

This is
something

## Sub Title

Settings

### Sub Sub Title

### Sub Sub Title 2

## Sub Title 2

#### Sub out of order
`;

function testThatSectionsAreProperlyExtracted() {
    const sectionHierarchy = toSectionHierarchy( testData );
    
    console.log( JSON.stringify( sectionHierarchy, null, 4 ) )
}

testThatSectionsAreProperlyExtracted()
