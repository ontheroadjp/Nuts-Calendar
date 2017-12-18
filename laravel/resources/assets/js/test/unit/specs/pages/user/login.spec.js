import Login from '../../../../../src/pages/user/login/index.vue';
import userService from '../../../../../src/services/user.js';
import { mount } from 'vue-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

describe('pages/user/login/index.vue', () => {
    describe('Input form errors', () => {
        const wrapper = mount(Login);

        const setEmail = (value) => {
            wrapper.vm.input.email = value;
        }

        const setPassword = (value) => {
            wrapper.vm.input.password = value;
        }

        describe('computed: isEmailInvalid', () => {
            it('has empty value', () => {
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email field is required.');
            });

            it('has valid email', () => {
                setEmail('hoge@hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.false;
            });

            it('has invalid email', () => {
                setEmail('hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email format is invalid.');
            });

            it('has invalid email (reqular expression)', () => {
                setEmail('##87@hoge.com');
                expect(wrapper.vm.isEmailInvalid()).is.true;
                expect(wrapper.vm.error.email).is.eql('The email format is invalid.');
            });
        });

        describe('computed: isPasswordInvalid', () => {
            it('has empty value', () => {
                expect(wrapper.vm.isPasswordInvalid()).is.true;
                expect(wrapper.vm.error.password).is.eql('The password field is required.');
            });

            it('has valid password', () => {
                setPassword('hogepassword');
                expect(wrapper.vm.isPasswordInvalid()).is.false;
            });
        });
    });

    describe('login()', () => {
        const wrapper = mount(Login);
        it('called', () => {
            expect(wrapper.vm.error.authentication).to.be.eql('');
            expect(wrapper.vm.error.email).to.be.eql('');
            expect(wrapper.vm.error.password).to.be.eql('');
        });

    });

});

