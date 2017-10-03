import NotificationModal from '../../../../../src/components/modal/notification-modal.vue';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

describe('components/modal/notification-modal.vue', () => {
    const onClose = sinon.stub();

    const propsData = {
        isActive: true,
        onClose: onClose,
        isShowNotification: false,
        type: 'success'
    };

    describe('HTML elements', () => {
        const wrapper = mount(NotificationModal, { propsData });
        const div = wrapper.find('div#notification-modal');

        it('mounted', () => {
            expect(div.is('div')).is.eql(true);
        });
    });

    describe('close()', () => {
        const wrapper = mount(NotificationModal, { propsData });
        wrapper.vm.close();

        it('calls onClose()', () => {
            expect(onClose.callCount).is.eql(1);
        });

        it('set value of showDelteConfirm to false', () => {
            setTimeout(() => {
                expect(wrapper.vm.showDeleteConfirm).is.false;
            }, 1010);
        });
    });

    describe('isActive', () => {
        const spy = sinon.spy(NotificationModal.methods, 'setModalHeight');
        const wrapper = mount(NotificationModal, { propsData });
//        const spy = sinon.spy(wrapper.vm, 'setModalHeight');

//        it('calls setModalHeight()', () => {
//            wrapper.setProps({isActive: false});
//            waitForUpdate(() => {
//                console.log('--------------------------------------');
//                expect(spy.callCount).is.eql(1);
//            });
//        });

//        it('calls setModalHeight()', (done) => {
//            expect(wrapper.vm.isActive).is.true;
//            wrapper.setProps({isActive: false});
//            expect(wrapper.vm.isActive).is.false;
//            wrapper.setProps({isActive: true});
//            expect(wrapper.vm.isActive).is.true;
//
//            Vue.nextTick().then(() => {
//                console.log('--------------------------------------');
//                expect(spy.callCount).is.eql(2);
//            }).then(done).catch(done);
//        });

        spy.restore();
    });

//    describe('isShowNotification()', () => {
//        const wrapper = mount(NotificationModal, { propsData });
//        const el = wrapper.find('div#notification-modal');
//
//        it('set hight attribute to \'div#notification-modal\'', () => {
//            wrapper.setProps({isShowNotification: true});
//            wrapper.update();
//            expect(el[0].hasStyle('height', wrapper.vm.modalHeightWhenSlideOpened)).is.true;
//        });
//    });
});
