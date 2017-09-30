import deleteConfirmSlidePanel from '../../../../../src/components/slide-panel/delete-confirm-slide-panel.vue';
import { mount } from 'avoriaz';

describe('components/slide-panel/delete-confirm-slide-panel.vue', () => {
    const propsData = {
        isActive: false
    };

    const slots = {
        default: {}
    };

    describe('when component mounted', () => {
        const wrapper = mount(deleteConfirmSlidePanel, { propsData });

        it('height should equal to 600px', () => {
            expect(wrapper.vm.height).to.be.eql('300px');
        });
    });
});


