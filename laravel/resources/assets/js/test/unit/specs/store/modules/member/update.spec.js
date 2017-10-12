import updateModule from '../../../../../../src/store/modules/member/update.js';
import { testAction } from '../../../helper.js';
import { PREPARE } from '../../../../../../src/store/mutation-types.js';
import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('store/module/userCalendar/update.js', () => {
    const { state } = updateModule;
    const { prepare, setUpdateValue, update, reset } = updateModule.actions;
    const { PREPARE, IS_LOADING, SET_UPDATE_VALUE, RESET, NOTIFY_SUCCESS, NOTIFY_DANGER } = updateModule.mutations;

    const editingMember = {
        id: 1,
        name: 'member 1',
        description: 'test member description'
    };

    describe('actions', () => {
        it('prepare', (done) => {
            testAction(prepare, { editingMember, isShow: true }, state, [
                { type: 'PREPARE', payload: { editingMember, isShow: true } }
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

            testAction(update, null, state, [
                { type: 'IS_LOADING', payload: true },
                { type: 'member/setValue', payload: { id: 100, key: 'name', value: 'updated name' } },
                { type: 'member/setValue', payload: { id: 100, key: 'description', value: 'updated description' } },
                { type: 'NOTIFY_SUCCESS', payload: { content: 'success update member', isImportant: false } },
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
            PREPARE(state, { editingMember, isShow: true });
            expect(state.editingMember).to.be.deep.eql(editingMember);
            expect(state.updateValues.id).to.be.eql(editingMember.id);
            expect(state.updateValues.name).to.be.eql(editingMember.name);
            expect(state.updateValues.description).to.be.eql(editingMember.description);
            expect(state.updateValues.isShow).to.be.true;
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
            expect(state.editingMember).to.be.eql('');
            expect(state.isLoading).to.be.false;
            expect(state.updateValues.id).to.be.eql('');
            expect(state.updateValues.name).to.be.eql('');
            expect(state.updateValues.description).to.be.eql('');
            expect(state.updateValues.isShow).to.be.false;
        });
    });
});
