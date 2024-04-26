import { Plugin } from 'obsidian';
import { ReorganizeSettings } from './settings';

export default class Reorganize extends Plugin {

    /** @constructor */
    constructor() {
        super();
        /** @type {ReorganizeSettings} settings */
        this.settings = new ReorganizeSettings();
    }

    async onload() {
        console.log('loading Reorganize plugin');
    }
    
    async onunload() {
        console.log('unloading Reorganize plugin');
    }
}
