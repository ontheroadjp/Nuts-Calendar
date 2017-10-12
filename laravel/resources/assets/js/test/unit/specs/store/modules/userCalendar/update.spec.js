import updateModule from '../../../../../../src/store/modules/userCalendar/update.js';
import { testAction } from '../../../helper.js';
import { PREPARE } from '../../../../../../src/store/mutation-types.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/userCalendar/update.js', () => {
    const { state } = updateModule;
    const { prepare, setUpdateValue, update, reset } = updateModule.actions;
    const { PREPARE, IS_LOADING, SET_UPDATE_VALUE, RESET, NOTIFY_SUCCESS, NOTIFY_DANGER } = updateModule.mutations;

    const userCalendar = {
        id: 1,
        name: 'user calendar 1',
        description: 'test description'
    };

    describe('actions', () => {
        it('prepare', (done) => {
            testAction(prepare, { userCalendar }, state, [
                { type: 'PREPARE', payload: { userCalendar } }
            ], null, done);
        });

        it('setUpdateValue', (done) => {
            testAction(setUpdateValue, { key: 'name', value: 'updated name' }, state, [
                { type: 'SET_UPDATE_VALUE', payload: { key: 'name', value: 'updated name' } }
            ], null, done);
        });

        it('update', (done) => {
            const resolved = new Promise.resolve({
                data: {
                    id: 100,
                    name: 'updated name',
                    description: 'updated description'
                }
            });
            const httpStub = sinon.stub(http, 'fetchPut').returns(resolved);

            testAction(update, false, state, [
                { type: 'IS_LOADING', payload: true },
                { type: 'userCalendar/setValue', payload: { id: 100, key: 'name', value: 'updated name' } },
                { type: 'userCalendar/setValue', payload: { id: 100, key: 'description', value: 'updated description' } },
//                { type: 'NOTIFY_SUCCESS', payload: { content: 'success update User Calendar', isImportant: false } },
                { type: 'IS_LOADING', payload: false }
            ], null, done);

            httpStub.restore();
        });

        it('reset', (done) => {
            testAction(reset, null, state, [
                { type: 'RESET', payload: null }
            ], null, done);
        });
    });

    describe('mutations', () => {
        it('PREPARE', () => {
            PREPARE(state, { userCalendar });
            expect(state.updateValues.id).to.be.eql(userCalendar.id);
            expect(state.updateValues.name).to.be.eql(userCalendar.name);
            expect(state.updateValues.description).to.be.eql(userCalendar.description);
        });

        it('IS_LOADING', () => {
            IS_LOADING(state, true);
            expect(state.isLoading).to.be.true;
        });

        it('SET_UPDATE_VALUE', () => {
            SET_UPDATE_VALUE(state, { key: 'name', value: 'updated name' });
            SET_UPDATE_VALUE(state, { key: 'description', value: 'updated description' });
            expect(state.updateValues.name).to.be.eql('updated name');
            expect(state.updateValues.description).to.be.eql('updated description');
        });

        it('RESET', () => {
            RESET(state);
            expect(state.isLoading).to.be.false;
            expect(state.editingUserCalendar).to.be.eql('');
            expect(state.updateValues.id).to.be.eql('');
            expect(state.updateValues.name).to.be.eql('');
            expect(state.updateValues.description).to.be.eql('');
        });
    });
});
