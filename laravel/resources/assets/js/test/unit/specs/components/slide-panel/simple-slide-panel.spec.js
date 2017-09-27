import simpleSlidePanel from '../../../../../src/components/slide-panel/simple-slide-panel.vue';
import { mount } from 'avoriaz';

describe('components/slide-panel/simple-slide-panel.vue', () => {
    const wrapper = mount(simpleSlidePanel, {
        propsData: {
            name: 'test-panel',
            height: '600px',
            duration: '1s',
            isActive: false
        }
    });

    describe('when component mounted', () => {
        it('height should equal to 600px', () => {
            expect(wrapper.vm.height).to.be.eql('600px');
        });
    });
});

