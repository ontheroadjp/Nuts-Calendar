import slidePanel from '../../../../../src/components/slide-panel/slide-panel.vue';
import { mount } from 'avoriaz';

describe('components/slide-panel/slide-panel.vue', () => {
    const wrapper = mount(slidePanel, {
        propsData: {
            height: '600px',
            duration: '1s'
        }
    });

    describe('when component mounted', () => {
        it('height should equal to 600px', () => {
            expect(wrapper.vm.height).to.be.eql('600px');
        });

        it('duration should equal to 1s', () => {
            expect(wrapper.vm.duration).to.be.eql('1s');
        });
    });
});
