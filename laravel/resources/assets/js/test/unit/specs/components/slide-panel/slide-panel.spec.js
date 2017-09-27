import slidePanel from '../../../../../src/components/slide-panel/slide-panel.vue';
import simpleSlidePanel from '../../../../../src/components/slide-panel/simple-slide-panel.vue';
import { mount } from 'avoriaz';

describe('components/slide-panel/slide-panel.vue', () => {
    const propsData = {
        height: '600px',
        duration: '1s'
    };

    const slots = {
        default: simpleSlidePanel
    };

    describe('when component mounted', () => {
        const wrapper = mount(slidePanel, { propsData, slots });

        it('height should equal to 600px', () => {
            expect(wrapper.vm.height).to.be.eql('600px');
        });

        it('duration should equal to 1s', () => {
            expect(wrapper.vm.duration).to.be.eql('1s');
        });
    });
});
