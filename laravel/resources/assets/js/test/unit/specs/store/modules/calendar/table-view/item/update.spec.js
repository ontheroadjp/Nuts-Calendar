import testModule from '../../../../../../../../src/store/modules/calendar/table-view/item/update.js';
import { testAction } from '../../../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/calendar/table-view/item/update.js', () => {
    const { state } = testModule;
    const { prepare, prepareModal, toggleTaskDone, setInputValue, update, reset } = testModule.actions;
    const { PREPARE, PREPARE_MODAL, IS_LOADING, TOGGLE_TASK_DONE, SET_INPUT_VALUE, RESET, NOTIFY_SUCCESS, NOTIFY_DANGER } = testModule.mutations;

    const editingMember = {
        id: 1,
        name: 'member 1',
        description: 'test member description'
    };

    describe('actions', () => {
        const event = {};
        const cellItems = [];
        const editingItem = {};

        it('prepare', (done) => {
            testAction(prepare, { event, cellItems, editingItem }, { state }, [
                { type: 'PREPARE', payload: { event, cellItems, editingItem } }
            ], done);
        });

        it('prepareModal', (done) => {
            testAction(prepareModal, { event }, { state }, [
                { type: 'PREPARE_MODAL', payload: { event } }
            ], done);
        });

        it('toggleTaskDone', (done) => {
            testAction(toggleTaskDone, null, { state }, [
                { type: 'TOGGLE_TASK_DONE' },
                { type: 'update' }
            ], done);
        });

        it('setInputValue', (done) => {
            const key = 'content';
            const value = 'shopping';
            testAction(setInputValue, { key, value }, { state }, [
                { type: 'SET_INPUT_VALUE', payload: { key, value } }
            ], done);
        });

        it('update', (done) => {

            const data = {
                member_id:  state.editingItem.member_id,
                date:       state.editingItem.date,
                is_done:    state.editingItem.is_done,

                content:    state.input.content,
                start_time: state.input.startTime,
                end_time:   state.input.endTime,
                is_all_day: state.input.allDay,
                memo:       state.input.memo
            };

            const resolved = new Promise.resolve(data);
            const httpStub = sinon.stub(http, 'fetchPut').returns(resolved);

            testAction(update, null, { state }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'UPDATE', payload: data },
                { type: 'calendar/tableView/updateCellItems', payload: [] },
//                { type: 'NOTIFY_SUCCESS', payload: { content: 'success update task', isImportant: false } },
                { type: 'IS_LOADING', payload: false }
            ], done);

            http.fetchPut.restore();
        });

        it('reset', (done) => {
            testAction(reset, null, { state }, [
                { type: 'RESET', payload: null }
            ], done);
        });
    });

    describe('mutations', () => {
        const editingItem ={
            member_id:  123,
            date:       2017-10-10,
            is_done:    false,
            content:    'test shkopping',
            start_time: '09:15',
            end_time:   '09:30',
            is_all_day: false,
            memo:       'test memo test memo test memo'
        };

        const event = {
            pageX: 123,
            pageY: 456
        };

        it('PREPARE', () => {
            PREPARE(state, { cellItems: [], editingItem });
            expect(state.cellItems).to.be.deep.eql([]);
            expect(state.editingItem).to.be.deep.eql(editingItem);
            expect(state.input.content).to.be.deep.eql(editingItem.content);
            expect(state.input.startTime).to.be.deep.eql(editingItem.start_time);
            expect(state.input.endTime).to.be.deep.eql(editingItem.end_time);
            expect(state.input.allDay).to.be.deep.eql(editingItem.is_all_day);
            expect(state.input.memo).to.be.deep.eql(editingItem.memo);
        });

        it('PREPARE_MODAL', () => {
            PREPARE_MODAL(state, { event });
            expect(state.clickX).to.be.eql(123);
            expect(state.clickY).to.be.eql(456);
            expect(state.isActive).to.be.true;
        });

        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });

        it('TOGGLE_TASK_DONE', () => {
            state.editingItem = editingItem;
            TOGGLE_TASK_DONE(state);
            expect(state.editingItem.is_done).to.be.true;
            TOGGLE_TASK_DONE(state);
            expect(state.editingItem.is_done).to.be.false;
        });

        it('SET_INPUT_VALUE', () => {
            SET_INPUT_VALUE(state, { key: 'content', value: 'updated content' });
            SET_INPUT_VALUE(state, { key: 'startTime', value: '12:34' });
            expect(state.input.content).to.be.eql('updated content');
            expect(state.input.startTime).to.be.eql('12:34');
        });

        it('RESET', () => {
            RESET(state);
            expect(state.isActive).to.be.false;
            expect(state.cellItems).to.be.eql('');
            expect(state.editingItem).to.be.eql('');
            expect(state.isLoading).to.be.false;
            expect(state.input.content).to.be.eql('');
            expect(state.input.startTime).to.be.eql('');
            expect(state.input.endTime).to.be.eql('');
            expect(state.input.allDay).to.be.eql('');
            expect(state.input.memo).to.be.eql('');
        });
    });
});
