import simpleSlidePanel from '../../../../../src/components/slide-panel/simple-slide-panel.vue';
import deleteConfirmSlidePanel from '../../../../../src/components/slide-panel/delete-confirm-slide-panel.vue';
import { mount } from 'avoriaz';

describe('components/slide-panel/simple-slide-panel.vue', () => {
    const propsData = {
        name: 'test-panel',
        height: '600px',
        duration: '1s',
        isActive: false
    };

//    const slots = {
//        default:
//    };

    describe('when component mounted', () => {
        const wrapper = mount(simpleSlidePanel, { propsData });

        it('height should equal to 600px', () => {
            expect(wrapper.vm.height).to.be.eql('600px');
        });
    });
});

