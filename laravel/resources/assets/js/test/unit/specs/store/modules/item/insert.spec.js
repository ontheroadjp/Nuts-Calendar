import testModule from '../../../../../../src/store/modules/calendar/table-view/item/insert.js';
import { testAction } from '../../../helper.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/item/insert.js', () => {
    const { state } = testModule;
    const { prepare, setValue, insertEvent, insertTask, insert, reset } = testModule.actions;
    const { PREPARE, IS_LOADING, RESET, SET_VALUE, INSERT, NOTIFY_SUCCESS, NOTIFY_DANGER } = testModule.mutations;

    describe('actions', () => {
        it('prepare', (done) => {
            testAction(prepare, { dayIndex: 12, memberId: 21, cellItems: {}}, state, [
                { type: 'PREPARE', payload: { dayIndex: 12, memberId: 21, cellItems: {} } }
            ], done);
        });

        it('setValue', (done) => {
            testAction(setValue, {key: 'newItem.content', value: 'test content'}, state, [
                { type: 'SET_VALUE', payload: {key: 'newItem.content', value: 'test content'}}
            ], done);
        });

        it('insertEvent', (done) => {
            testAction(insertEvent, null, state, [
                { type: 'insert', payload: {typeId: 1} }
            ], done);
        });

        it('insertTask', (done) => {
            testAction(insertTask, null, state, [
                { type: 'insert', payload: {typeId: 2}}
            ], done);
        });

        it('insert', (done) => {
            const responseData = {
                data: { id: 1234567890 }
            };
            const resolved = new Promise.resolve(responseData);
            const httpStub = sinon.stub(http, 'fetchPost').returns(resolved);

            const actionPayload = {
                typeId: 1
            };

            const rootState = {
                calendar: {
                    currentYear: 2018,
                    currentMonth: 8,
                }
            };

            state.newItem.content = 'new item content';

            testAction(insert, actionPayload, { state, rootState }, [
                { type: 'IS_LOADING', payload: true },
                { type: 'INSERT', payload: { item: {id: 1234567890} } },
                { type: 'calendar/tableView/updateCellItems', payload: {} },
                { type: 'NOTIFY_SUCCESS', payload: {content: 'success add task', isImportant: false} },
                { type: 'IS_LOADING', payload: false },
                { type: 'RESET', payload: null },
            ], done);

            http.fetchPost.restore();
        });

        it('reset', (done) => {
            testAction(reset, null, state, [
                { type: 'RESET', payload: null }
            ], done);
        });
    });

    describe('mutations', () => {
        it('PREPARE', () => {
            PREPARE(state, { dayIndex: 29, memberId: 21, cellItems: {}});
            expect(state.enterCell.dayIndex).to.be.eql(29);
            expect(state.enterCell.memberId).to.be.eql(21);
            expect(state.enterCell.cellItems).to.be.eql({});
            expect(state.isActive).to.be.true;
        });

        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });

        it('INSERT', () => {
            state.enterCell.cellItems = [];
            INSERT(state, {item: {}});
            INSERT(state, {item: {}});
            INSERT(state, {item: {}});
            expect(state.enterCell.cellItems.length).to.be.eql(3);
        });

        it('RESET', () => {
            RESET(state);
            expect(state.isActive).to.be.false;
            expect(state.enterCell.dayIndex).to.be.eql('');
            expect(state.enterCell.memberId).to.be.eql('');
            expect(state.enterCell.cellItems).to.be.eql('');
            expect(state.newItem.content).to.be.eql('');
            expect(state.error.isError).to.be.false;
            expect(state.error.message).to.be.eql('');
        });
    });
});
