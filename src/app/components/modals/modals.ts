import {Component} from 'angular2/core';
declare var jQuery: any;

import {CmDelete} from './contact/delete/delete';
import {CmRemove} from './contact/remove/remove';
import {CmDuplication} from './contact/duplication/duplication';
import {LmCreate} from './list/create/create';
import {LmDelete} from './list/delete/delete';
import {LmDuplication} from './list/duplication/duplication';
import {LmEdit} from './list/edit/edit';
import {LmImport} from './list/import/import';
import {LmImportMatching} from './list/import-matching/import-matching';
import {LmWarning} from './list/warning/warning';

@Component({
    selector: 'modals',
    directives: [
        CmDelete, CmRemove, CmDuplication,
        LmCreate, LmDelete, LmDuplication, LmEdit, LmImport, LmImportMatching, LmWarning
    ],
    template: `
        <cm-delete></cm-delete>
        <cm-remove></cm-remove>
        <cm-duplication></cm-duplication>
        <lm-create></lm-create>
        <lm-delete></lm-delete>
        <lm-duplication></lm-duplication>
        <lm-edit></lm-edit>
        <lm-import></lm-import>
        <lm-import-matching></lm-import-matching>
        <lm-warning></lm-warning>
    `
})
export class Modals {
}