import testModule from '../../../../../../src/store/modules/calendar/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/calendar/index.js', () => {
    const { state } = testModule;
    const { SET_VALUE } = testModule.mutations;

    describe('mutations', () => {
        it('SET_VALUE', () => {
            SET_VALUE(state, {key: 'disabled', value: true});
            expect(state.disabled).to.be.true;
        });
    });
});
