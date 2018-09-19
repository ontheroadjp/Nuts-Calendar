import memberModule from '../../../../../../src/store/modules/member/index.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('store/module/member/index.js', () => {
    const { state } = memberModule;
    const { INIT } = memberModule.mutations;
    const members = {
        1: { id: 1, name: 'member 1' },
        2: { id: 2, name: 'member 2' },
        3: { id: 3, name: 'member 3' }
    };

    describe('mutations', () => {
        it('INIT', () => {
            INIT(state, members);
            expect(Object.keys(state.data.members).length).is.eql(3);
        });
    });
});
