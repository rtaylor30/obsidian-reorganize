import { Section } from "refactoring/enumerations.mjs";
import { extractToNewNote } from "refactoring/extractToNewNote.mjs";

export default [
    {
        name: "Extract H1 Sections to New Notes",
        action: extractToNewNote(Section.h1, Section.document),
    },
    {
        name: "Extract H2 Sections to New Notes",
        action: extractToNewNote(Section.h2, Section.document),
    },
    {
        name: "Extract H3 Sections to New Notes",
        action: extractToNewNote(Section.h3, Section.document),
    },
    {
        name: "Extract H4 Sections to New Notes",
        action: extractToNewNote(Section.h4, Section.document),
    },
    {
        name: "Extract Sub-Headings From Current Section on Line",
        action: determineCurrentSectionLevel.andThen( extractToNewNote ),
    },
    {
        name: "Extract H2 Sections Within H1 Section to New Notes",
        action: extractToNewNote(Section.h2, Section.h1),
    },
    {
        name: "Extract H3 Sections Within H2 Section to New Notes",
        action: extractToNewNote(Section.h3, Section.h2),
    },
    {
        name: "Extract H4 Sections Within H3 Section to New Notes",
        action: extractToNewNote(Section.h4, Section.h3),
    },
];
