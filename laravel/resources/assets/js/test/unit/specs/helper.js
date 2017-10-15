function actionAssert(type, payload, expectation, done) {
    try {
        expect(type).to.equal(expectation.type);
        if (payload) expect(payload).to.deep.equal(expectation.payload);
    } catch (error) {
        done(error);
    }
}

/**
 * Helper function for the vuex action testing
 *
 * @param { string } action action name
 * @param { object } payload attributes of the action
 * @param { object } context attributes of the action
 * @param { array } expected expected mutations and dispaches ex.[{ type:'insert', payload:{id: 123} }]
 * @param { object } done
 */
export const testAction = (action, payload, context, expected, done) => {
    let count = 0;

    // commit mock
    context.commit = (type, payload) => {
        actionAssert(type, payload, expected[count], done);
        if (++count >= expected.length) done();
    };

    // dispatch mock
    context.dispatch = (type, payload) => {
        actionAssert(type, payload, expected[count], done);
        if (++count >= expected.length) done();
    };

    // call action
    action(context, payload);

    // check that all mutations and dispachers are called
    if (expected.length === 0 ) {
        expect(count).to.equal(0);
        done();
    }
};
