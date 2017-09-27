import deleteConfirmModal from '../../../../../src/components/modal/delete-confirm-modal.vue';
import simpleModal from '../../../../../src/components/modal/simple-modal.vue';
import { mount, shallow } from 'avoriaz';
import sinon from 'sinon';

describe('components/modal/delete-confirm-modal.vue', () => {
    const setModalHeight = sinon.spy(deleteConfirmModal.methods, 'setModalHeight');
    const onClose = sinon.stub();


    const wrapper = mount(deleteConfirmModal, {
        attachToDocument: true,
        slots: {
            default: simpleModal
        },
        propsData: {
            opacity: 0.1,
            isActive: false,
            onClose: onClose
        }
    });

//    const simpleModal = mount(simpleModal, {
//        propsData: {
//            isActive: wrapper.vm.isActive,
//            onClose: onClose
//        }
//    });

    it('check props', () => {
        expect(wrapper.vm.opacity).to.be.eql(0.1);
        expect(wrapper.vm.isActive).to.be.eql(false);
        expect(typeof wrapper.vm.onClose).to.be.eql('function');
    });

    describe('when value of isActive is changed', () => {
        it('new value is true', () => {
            expect(wrapper.vm.isActive).to.be.eql(false);
            wrapper.setProps({isActive: true});
            expect(wrapper.vm.isActive).to.be.eql(true);
            wrapper.vm.$nextTick(() => {
                expect(setModalHeight.callCount).to.be.eql(1);
            });
        });

        it('new value is false', () => {
            expect(wrapper.vm.isActive).to.be.eql(true);
            wrapper.setProps({isActive: false});
            expect(wrapper.vm.isActive).to.be.eql(false);
            wrapper.vm.$nextTick(() => {
                expect(setModalHeight.callCount).to.be.eql(1);
            });
        });

//        it('height is changed', () => {
////            const el = wrapper.element.querySelector('div#delete-confirm-modal');
//
////            const simpleModal = shallow(wrapper.vm.$options.components.simpleModal, {
////                propsData: { isActive: wrapper.vm.isActive, onClose: () => {} }
////            });
////            const hoge = simpleModal.find('div#delete-confirm-modal')[0];
//
//            console.log(wrapper.element);
//        });
    });
});
