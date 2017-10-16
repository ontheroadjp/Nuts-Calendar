import testModule from '../../../../../../../src/store/modules/calendar/table-view/tool-palette.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/calendar/table-view/tool-palette.js', () => {
    const { state } = testModule;
    const {
        TOGGLE_SHOW_HIDE_COLUMN,
        TOGGLE_TABLE_TOOL_PALETTE,
        TOGGLE_SHOW_HIDE_EVENT_ITEM,
        TOGGLE_SHOW_HIDE_TASK_ITEM,
        TOGGLE_SHOW_HIDE_END_TIME,
        SET_SEARCH_QUERY,
        SET_INTERNAL_QUERY
    } = testModule.mutations;

    describe('mutations', () => {
        it('TOGGLE_SHOW_HIDE_COLUMN', () => {
            const member = {};
            TOGGLE_SHOW_HIDE_COLUMN(state, {member, value: true});
            expect(member.isShow).to.be.true;
        });

        it('TOGGLE_TABLE_TOOL_PALETTE', () => {
            TOGGLE_TABLE_TOOL_PALETTE(state, {value: true});
            expect(state.toolPalette.isActive).to.be.true;
        });

        it('TOGGLE_SHOW_HIDE_EVENT_ITEM', () => {
            TOGGLE_SHOW_HIDE_EVENT_ITEM(state, {value: true});
            expect(state.isEventItemShow).to.be.true;
        });

        it('TOGGLE_SHOW_HIDE_TASK_ITEM', () => {
            TOGGLE_SHOW_HIDE_TASK_ITEM(state, {value: true});
            expect(state.isTaskItemShow).to.be.true;
        });

        it('TOGGLE_SHOW_HIDE_END_TIME', () => {
            TOGGLE_SHOW_HIDE_END_TIME(state, {value: true});
            expect(state.isEndTimeShow).to.be.true;
        });

        it('SET_SEARCH_QUERY', () => {
            SET_SEARCH_QUERY(state, {value: 'shopping'});
            expect(state.query.search).to.be.eql('shopping');
        });

        it('SET_INTERNAL_QUERY', () => {
            SET_INTERNAL_QUERY(state, {value: 'sun'});
            expect(state.query.internal).to.be.eql('sun');
        });
    });
});
