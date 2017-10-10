import PasswordMail from '../../../../../src/pages/user/password-mail.vue';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';

describe('pages/user/password-mail.vue', () => {
    describe('sendPasswordMail()', () => {
        const wrapper = mount(PasswordMail);
        const resolved = new Promise.resolve();
        const stub = sinon.stub(axios, 'post').returns(resolved);

        before(()=> {
            axios.delete('http://localhost:1080/messages')
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        it('called', (done) => {
            wrapper.setData({
                input: { email: 'hoge@hoge.com' }
            });
            expect(wrapper.vm.isEmailInvalid()).to.be.false;
            wrapper.vm.sendPasswordMail()
            resolved.then(() => {
                expect(wrapper.vm.passwordMailResult).to.be.eql('success');
                done();
            });
        });
    });

//    describe('MailCatcher', () => {
//        it('reset email', () => {
//            console.log('-----------------------------------');
//            axios.get('http://localhost:1080/messages/1.source')
//                .then((response) => {
//                    console.log(response.data);
//                });
//            console.log('-----------------------------------');
//        });
//    });

});
