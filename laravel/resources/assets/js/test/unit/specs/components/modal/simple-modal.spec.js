import modal from '../../../../../src/components/modal/simple-modal.vue';
import { mount } from 'avoriaz';

describe('components/modal/simple-modal.vue', () => {

    const wrapper = mount(modal, {
        propsData: {
            opacity: 0.1,
            isActive: true
        }
    });

    it('check props', () => {
        expect(wrapper.vm.opacity).to.be.eql(0.1);
        expect(wrapper.vm.isActive).to.be.eql(true);
    });

    describe('when component mounted', () => {
        it('props: opacity set to div tag', () => {
            const tag = wrapper.find('.modal-background')[0];
            expect(tag.hasStyle('background-color','rgba(10,10,10,.1)'))
                .to.be.eql(true);
        });
    });
});
